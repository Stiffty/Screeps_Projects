/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var Transporter = {




    run: function (creep,ClientAnzahl) {

        let search = function (target) {
            let source = creep.room.findClosestByPath(target);
            creep.memory.target = creep.room.findPath(creep.pos, source[0].pos);
            creep.move(creep.memory.target[0].x,creep.memory.target[0].y)
        };

        switch (creep.memory.action) {

            case 1:
                let source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                creep.memory.way = creep.room.findPath(creep.pos, source.pos);
                creep.memory.target = source.id;
                creep.moveTo(creep.memory.way[0].x,creep.memory.way[0].y);
                creep.memory.action = 4;
                break
            case 2:
                let spawn = creep.room.find(FIND_MY_SPAWNS);
                creep.memory.way = creep.room.findPath(creep.pos, spawn[0].pos);
                creep.memory.target = spawn.id;
                creep.moveTo(creep.memory.way[0].x,creep.memory.way[0].y);
                creep.memory.action = 5;
                break
            case 3:
                let client = Game.creeps[creep.memory.client];
                creep.memory.way = creep.room.findPath(creep.pos, client.pos);

                break
            case 4:
                creep.moveByPath(creep.memory.way);
                console.log(creep.memory.target);
                if(creep.pickup(Game.getObjectById(creep.memory.target))  === OK){
                    creep.memory.action = 7;
                }
                break
            case 5:
                creep.moveByPath(creep.memory.way);
                if(creep.transfer(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === OK){
                    creep.memory.action = 8;
                }
                break
            case 6:
                creep.moveByPath(creep.memory.way);
                if(creep.transfer(Game.creeps[creep.memory.client],RESOURCE_ENERGY) === OK){

                }
                break
            case 7:
                if(creep.harvest(creep.memory.target) !== OK&&creep.store.getUsedCapacity() !== creep.store.getCapacity()){
                 creep.memory.action = 1;
                }else if(creep.store.getUsedCapacity() === creep.store.getCapacity()){
                    creep.memory.action = 2;
            }
                break
            case 8:
                creep.transfer(creep.memory.target,RESOURCE_ENERGY);
                creep.memory.action = 1;
                break
        }

    }

};
module.exports = Transporter;