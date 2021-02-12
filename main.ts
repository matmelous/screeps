
import roleHarvester from './modules/harvester';
import roleUpgrader from './modules/upgrader';
import roleBuilder from './modules/builder';
import roleSpawner from './modules/spawner';

export const loop = function () {

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
}
