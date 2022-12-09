import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Energy from '../Energy';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';

export const getAdditionalData = () => [
  new AdditionalData(Spaceship, 'energy', (spaceship: Spaceship) =>
    spaceship.yields().reduce((energy, spaceshipYield) => {
      if (spaceshipYield instanceof Energy) {
        energy.add(spaceshipYield);
      }

      return energy;
    }, new Energy())
  ),
];

export default getAdditionalData;
