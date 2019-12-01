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

        switch (creep.memory.action) {
            case 1:
                //Recource als Path
                let source = creep.room.find(FIND_SOURCES);
                creep.memory.source = creep.room.findPath(creep.pos, source[0].pos);
                creep.memory.deathtimer = creep.memory.source.length + 50;
                creep.memory.action = 2;
                break;
            case 2:
                //Path aus dem Speicher Ablaufen
                creep.moveByPath(creep.memory.source);
                creep.memory.deathtimer--;
                if (creep.memory.deathtimer === 0) {
                    creep.memory.action = 1;
                }

                let pos = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(pos) === OK) {
                    creep.memory.action = 3;
                }
                break;
            case 3:
                //Minen
                let pos1 = creep.pos.findClosestByPath(FIND_SOURCES);
                creep.harvest(pos1);
                break;
            default:
                creep.memory.action = 1;
                break;
        }
    }
};

module.exports = Miner;