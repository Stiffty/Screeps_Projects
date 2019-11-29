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

        if (creep.upgradeController(creep.room.controller)=== (ERR_NOT_ENOUGH_RESOURCES)) {

            let target = creep.room.controller;
            creep.moveTo(target);
        }else if(Game.creeps[creep.memory.transporter] === undefined){
            creep.memory.transporter = null;
        }
    }
};

module.exports =Upgrader;