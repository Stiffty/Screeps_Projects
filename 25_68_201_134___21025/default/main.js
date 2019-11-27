var miner = require('role.Miner');
module.exports.loop = function () {


    Game.spawns['Spawn1'].createCreep([WORK,MOVE,CARRY],undefined, {role: 'Miner'},{ dryRun: true });
    for(const name in Game.creeps){
        var creep = Game.creeps[name];
    if(creep.memory.role === 'Miner'){
        miner.run(creep);
    }

    }
};