"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const Energy_1 = require("../Energy");
const Spaceship_1 = require("@civ-clone/core-spaceship/Spaceship");
const getAdditionalData = () => [
    new AdditionalData_1.default(Spaceship_1.default, 'energy', (spaceship) => spaceship.yields().reduce((energy, spaceshipYield) => {
        if (spaceshipYield instanceof Energy_1.default) {
            energy.add(spaceshipYield);
        }
        return energy;
    }, new Energy_1.default())),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=energy.js.map