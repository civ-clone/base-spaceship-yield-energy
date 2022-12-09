import AdditionalDataRegistry from '@civ-clone/core-data-object/AdditionalDataRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Effect from '@civ-clone/core-rule/Effect';
import Energy from '../Energy';
import Part from '@civ-clone/core-spaceship/Part';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import Yield from '@civ-clone/core-spaceship/Rules/Yield';
import energy from '../AdditionalData/energy';
import { expect } from 'chai';
import reconstituteData from '@civ-clone/core-data-object/lib/reconstituteData';
import { setUpCity } from '@civ-clone/civ1-city/tests/lib/setUpCity';

describe('Spaceship.energy', () => {
  it('should expose an energy key for a Spaceship when transferring', async () => {
    const ruleRegistry = new RuleRegistry(),
      city = await setUpCity({
        ruleRegistry,
      }),
      spaceship = new Spaceship(city.player(), ruleRegistry),
      additionalDataRegistry = new AdditionalDataRegistry();

    city.player().setCivilization(new Civilization());

    let alternator = true;

    ruleRegistry.register(
      new Yield(
        new Effect(() => new Energy((alternator = !alternator) ? -50 : 50))
      )
    );

    additionalDataRegistry.register(...energy());

    spaceship.add(new Part(city, ruleRegistry));

    const object = reconstituteData(
      spaceship.toPlainObject(undefined, additionalDataRegistry)
    );

    expect(object.energy.value).eq(50);

    spaceship.add(new Part(city, ruleRegistry));
    spaceship.add(new Part(city, ruleRegistry));
    spaceship.add(new Part(city, ruleRegistry));

    const updatedObject = reconstituteData(
      spaceship.toPlainObject(undefined, additionalDataRegistry)
    );

    expect(updatedObject.energy.value).eq(0);
  });
});
