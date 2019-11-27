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

        if (creep.memory.source === null||creep.harvest(Game.getObjectById(creep.memory.source)) === ERR_NOT_IN_RANGE) {
            console.log('Test');
            let sources = creep.room.find(FIND_SOURCES_ACTIVE);
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#03ff0a'}});
            if (creep.harvest(sources[0]) !== ERR_NOT_IN_RANGE) {
                creep.memory.source = sources[0].id;
            }

        } else {
            console.log('Test');
            let source = Game.getObjectById(creep.memory.source);
            console.log(source);
            if(creep.harvest(source) === ERR_NOT_ENOUGH_RESOURCES){
                creep.memory.source = null;
            }
           //creep.harvest(source[0]);
        }

    },


};

module.exports = Miner;