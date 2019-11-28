/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Builder');
 * mod.thing == 'a thing'; // true
 */
var Builder = {

    run: function (creep) {


        let source = creep.room.find(FIND_DROPPED_RESOURCES);
        if (creep.store.getFreeCapacity() < 50) {

            let target = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            let action = creep.build(target[0]);
            console.log(action);
            if(action === ERR_NOT_IN_RANGE){
                creep.moveTo(target[0]);
            }
        } else if(creep.pickup(source[0]) === ERR_NOT_IN_RANGE){

            creep.moveTo(source[0]);
        }
    }

};
module.exports = Builder;