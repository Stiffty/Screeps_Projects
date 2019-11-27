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

        if (creep.store.getFreeCapacity()>0){
            let sources = creep.room.find(FIND_SOURCES);
            creep.say(' Suche...');
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0],{visualizePathStyle: {stroke: '#03ff0a'}});
                creep.say(' Mine...');
            }
        }else{
            let base = creep.room.find(FIND_MY_SPAWNS);

            if( creep.transfer(base[0],RESOURCE_ENERGY)=== ERR_NOT_IN_RANGE){
                creep.moveTo(base[0]);
            }
        }
    }

};

module.exports = Miner;