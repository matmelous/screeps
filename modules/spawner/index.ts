
import {clearMemory} from '../helpers/helper';
import {watchHarvesters} from '../harvester/role.harvester';
import {watchBuilders} from '../builder/role.builder';


export const  loopSpawns= (spawn) => {
    watchHarvesters(spawn,0);
}


const roleSpawner = {
    run: function(){
        clearMemory();


        for(var spawnName in Game.spawns){
            const spawn=Game.spawns[spawnName];
            watchHarvesters(spawn,0);
            watchBuilders(spawn,0);

        }
    }
}

export default roleSpawner;
