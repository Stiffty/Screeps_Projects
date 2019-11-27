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

        if (creep.harvest(Game.getObjectById(creep.memory.source)) === (ERR_NOT_IN_RANGE||ERR_NOT_ENOUGH_RESOURCES) || creep.memory.source === null) {

            let sources = creep.room.find(FIND_SOURCES_ACTIVE);

            if (sources[0]) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#03ff0a'}});
                creep.memory.source = sources[0].id;
            }
        }
    }
};

module.exports = Miner;