/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Miner');
 * mod.thing == 'a thing'; // true
 */
var Miner = {

    run: function (creep) {

        let MoveToResourceUMine = {
            MoveR: function () {
                if (creep.memory.source === null) {
                    let path = creep.pos.findClosestByPath(FIND_SOURCES);

                    if(path == null){
                        creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
                        creep.room.find(FIND_MY_SPAWNS)[0].recycleCreep(creep);
                    }else{
                        creep.memory.source = path.id;
                        creep.memory.deathtimer = creep.room.findPath(creep.pos, Game.getObjectById(creep.memory.source).pos).length + 20;
                    }

                } else if (creep.harvest(Game.getObjectById(creep.memory.source)) !== OK) {
                    creep.moveTo(Game.getObjectById(creep.memory.source));

                    if (creep.memory.deathtimer === 0) {
                        creep.memory.source = null;
                    }else{
                        creep.memory.deathtimer--;
                    }
                }
            }

        };
        MoveToResourceUMine.MoveR();
    }
};

module.exports = Miner;