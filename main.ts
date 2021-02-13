import { ErrorMapper } from "utils/ErrorMapper";
import roleHarvester from './modules/workers/harvester';
import roleUpgrader from './modules/workers/upgrader';
import roleBuilder from './modules/workers/builder';
import roleSpawner from './modules/spawner';
import {init} from './modules/workers/management';


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

    init();

    roleSpawner.run();


    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
});
