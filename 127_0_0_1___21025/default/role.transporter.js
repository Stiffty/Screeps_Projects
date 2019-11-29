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


        switch (creep.memory.action) {

            case 1:
                //Find Recource
                let source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                creep.memory.way = creep.room.findPath(creep.pos, source.pos);
                creep.memory.target = source.id;

                if(creep.memory.client === null){
                    creep.memory.action = 10;
                }

                creep.memory.action = 4;
                break
            case 2:
                //Find Spawn
                let spawn = creep.room.find(FIND_MY_SPAWNS);
                creep.memory.way = creep.room.findPath(creep.pos, spawn[0].pos);
                creep.memory.target = spawn[0].id;
                creep.moveTo(creep.memory.way[0].x,creep.memory.way[0].y);
                creep.memory.action = 5;
                break
            case 3:
                //Find Client
                if(creep.memory.client!== null) {
                    let client = Game.creeps[creep.memory.client];
                    creep.memory.way = creep.room.findPath(creep.pos, client.pos);
                    creep.memory.target = client.id;
                    creep.memory.action = 6;
                }else{
                    //Container
                }
                break
            case 4:
                //Moveto Reccource
                if(creep.moveTo(Game.getObjectById(creep.memory.target)) === ERR_INVALID_TARGET){
                    creep.memory.action = 1;
                }

                if(creep.pickup(Game.getObjectById(creep.memory.target))  === OK){
                    creep.memory.action = 7;
                }
                break
            case 5:
                //MoveTo Spawn
                creep.moveByPath(creep.memory.way);

                if(creep.transfer(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === OK){
                    creep.memory.action = 8;
                }else if(creep.transfer(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === ERR_FULL){
                    creep.memory.action = 10;
                }
                break
            case 6:
                //MoveTo Client
                console.log(creep.moveTo(Game.getObjectById(creep.memory.target)));
                creep.moveTo(Game.creeps[creep.memory.client]);
                if(creep.transfer(Game.creeps[creep.memory.client],RESOURCE_ENERGY) === OK){
                    creep.memory.action = 9;
                }
                break
            case 7:
                //Pickup
                if(creep.pickup(Game.getObjectById(creep.memory.target)) !== OK&&creep.store.getUsedCapacity() !== creep.store.getCapacity()){
                 creep.memory.action = 1;
                }else if(creep.store.getUsedCapacity() === creep.store.getCapacity()){

                    creep.memory.action = 2;
            }
                break
            case 8:

                creep.transfer(creep.memory.target,RESOURCE_ENERGY);
                creep.memory.action = 1;
                break
            case 9:
                creep.transfer(Game.creeps[creep.memory.client],RESOURCE_ENERGY);
                if(creep.store.getUsedCapacity() === 0){
                    creep.memory.action = 1;
                }
                break
            case 10:
                let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');

                for(const i in creeps){
                    if(creeps[i].memory.transporter === null&&creep.memory.client === null){
                        console.log(Game.creeps[creeps[i].name]);
                        Game.creeps[creeps[i].name].memory.transporter = creep.name;

                        creep.memory.client = Game.creeps[creeps[i].name].name;
                    }
                }
                creep.memory.action = 3;
                break
        }

    }

};
module.exports = Transporter;