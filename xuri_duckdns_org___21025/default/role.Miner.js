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

        if (creep.memory.source === null || creep.harvest(Game.getObjectById(creep.memory.source)) === (ERR_NOT_IN_RANGE || ERR_NOT_ENOUGH_RESOURCES)) {

            let sources = creep.room.find(FIND_SOURCES);
            creep.memory.deathtimer--;
            if (creep.moveTo(Game.getObjectById(creep.memory.source),{visualizePathStyle: {stroke: '#03ff0a'}}) !== OK&&creep.memory.source === null) {
               // creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#03ff0a'}});
                creep.memory.source = sources[0].id;
            }
            if(creep.memory.deathtimer === 0){
                creep.memory.source=sources[0].id;
                creep.memory.deathtimer = 50;
            }
        }

    }
};

module.exports = Miner;