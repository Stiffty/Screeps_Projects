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

        if (creep.store[RESOURCE_ENERGY] === creep) {

            let target = creep.room.controller.pos;
            if (creep.upgradeController(target) === ERR_NOT_ENOUGH_RESOURCES&&creep.memory.transporter !== null) {

                    let name = creep.memory.transporter;
                    creep.say(name);
                    creep.moveTo(Game.creeps[name].pos);
            }
        } else if(Game.creeps[creep.memory.transporter] === undefined){
            creep.memory.transporter = null;
        }else{
            let target = creep.room.controller;
            console.log(creep.upgradeController(target));
            if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports =Upgrader;