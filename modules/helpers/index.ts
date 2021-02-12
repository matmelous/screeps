
export const clearMemory = () => {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

export const randomName = (pre) =>{
    return(pre + Game.time);
}

export const workerLevels = [
    [WORK,CARRY,MOVE],
    [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
    ];


