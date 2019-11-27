/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Upgrader');
 * mod.thing == 'a thing'; // true
 */
var Upgrader = {

    run: function (creep) {

        if (creep.store.getFreeCapacity() > 50) {


            let target = creep.room.controller.pos;
            if (creep.upgradeController(target) === ERR_NOT_ENOUGH_RESOURCES&&creep.memory.transporter !== null) {
                //creep.moveTo(target, {visualizePathStyle: {stroke: '#f3ff04'}});
               // let base = creep.room.find(FIND_MY_SPAWNS);

                let name = creep.memory.transporter;
                    creep.say(name);
                    creep.moveTo(Game.creeps[name].pos);

                //if (creep.transfer(base[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                 //   creep.moveTo(base[0]);
                //}
                //creep.say(creep.room.controller.pos);
            }
        } else {
            let target = creep.room.controller;
            console.log(creep.upgradeController(target));
            if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports =Upgrader;