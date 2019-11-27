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
        if (creep.upgradeController(creep.room.controller)=== ERR_NOT_IN_RANGE||creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
            //console.log(creep.upgradeController(creep.room.controller));
            let target = creep.room.controller;
            creep.moveTo(target);
        }
    }
};

module.exports =Upgrader;