/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var Transporter = {


    run: function (creep, ClientAnzahl) {

        let rounds = 2;
        for (let i = 0; i < rounds; i++) {

            switch (creep.memory.action) {

                case 1:
                    //Find Recource
                    let source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                    if (source !== null) {
                        creep.memory.way = creep.room.findPath(creep.pos, source.pos);
                        creep.memory.target = source.id;
                    }
                    if (creep.memory.client !== null) {
                        
                    }
                    if (creep.memory.client === null) {
                        creep.memory.action = 10;
                    }
                    rounds++;
                    creep.memory.action = 4;
                    break
                case 2:
                    //Find Spawn
                    let spawn = creep.room.find(FIND_MY_SPAWNS);
                    creep.memory.way = creep.room.findPath(creep.pos, spawn[0].pos);
                    creep.memory.target = spawn[0].id;
                    creep.moveTo(creep.memory.way[0].x, creep.memory.way[0].y);
                    rounds++;
                    creep.memory.action = 5;
                    break
                case 3:
                    //Find Client
                    if (creep.memory.client !== null) {
                        let client = Game.creeps[creep.memory.client];
                        creep.memory.way = creep.room.findPath(creep.pos, client.pos);
                        creep.memory.target = client.id;
                        rounds++;
                        creep.memory.action = 6;
                    } else {
                        //Container
                        creep.memory.action = 11;
                    }
                    break
                case 4:
                    //Moveto Reccource
                    if (creep.moveTo(Game.getObjectById(creep.memory.target)) === ERR_INVALID_TARGET) {
                        creep.memory.action = 1;
                    }

                    if (creep.pickup(Game.getObjectById(creep.memory.target)) === OK||creep.pickup(Game.getObjectById(creep.memory.target)) === ERR_FULL) {
                        creep.memory.action = 7;
                    }
                    break
                case 5:
                    //MoveTo Spawn
                    creep.moveTo(Game.getObjectById(creep.memory.target));

                    if (creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) === OK) {
                        creep.memory.action = 8;
                    } else if (creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) === ERR_FULL) {
                        creep.memory.action = 10;
                    }
                    break
                case 6:
                    //MoveTo Client
                    creep.moveTo(Game.creeps[creep.memory.client]);
                    if (creep.transfer(Game.creeps[creep.memory.client], RESOURCE_ENERGY) === OK) {
                        creep.memory.action = 9;
                    }
                    break
                case 7:
                    //Pickup
                    if (creep.pickup(Game.getObjectById(creep.memory.target)) !== OK && creep.store.getUsedCapacity() !== creep.store.getCapacity()) {
                        creep.memory.action = 1;
                    } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
                        if (creep.room.find(FIND_MY_SPAWNS)[0].store[RESOURCE_ENERGY] < 300) {
                            rounds++;
                            creep.memory.action = 2;
                        } else {
                            rounds++;
                            creep.memory.action = 10;
                        }

                    }
                    break
                case 8:

                    creep.transfer(creep.memory.target, RESOURCE_ENERGY);
                    creep.memory.action = 1;
                    break
                case 9:
                    creep.transfer(Game.creeps[creep.memory.client], RESOURCE_ENERGY);
                    if (creep.store.getUsedCapacity() === 0) {
                        creep.memory.action = 1;
                    }
                    break
                case 10:
                    let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');

                    if (Game.creeps[creep.memory.client] === undefined) {
                        creep.memory.client = null
                    }
                    for (const i in creeps) {
                        if (creeps[i].memory.transporter === null && creep.memory.client === null) {
                            Game.creeps[creeps[i].name].memory.transporter = creep.name;

                            creep.memory.client = Game.creeps[creeps[i].name].name;
                        }
                    }
                    rounds++;
                    creep.memory.action = 3;
                    break
                case 11:
                    //FindContainer
                    let Structures = creep.room.find(FIND_STRUCTURES);
                    for (const i in Structures){
                        if(Structures[i].structureType === STRUCTURE_CONTAINER&&Structures[i].store.getUsedCapacity()< Structures[i].store.getCapacity()){
                            creep.memory.target = Structures[i].id;

                            break
                        }
                    }
                    creep.memory.action = 12;
                    break
                case 12:
                    //Move to Container
                    console.log(Game.getObjectById(creep.memory.target));
                    creep.moveTo(Game.getObjectById(creep.memory.target));
                    if (creep.transfer(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === OK) {
                        creep.memory.action = 13;
                    }else if(creep.transfer(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === ERR_FULL){
                        creep.memory.action = 1;
                    }
                    break
                case 13:
                    //Transfer Container
                    creep.transfer(Game.getObjectById(creep.memory.target));
                    if(creep.store.getUsedCapacity() === 0) {
                        creep.memory.action = 1;
                    }
                break
            }

        }
        creep.say('T' +  creep.memory.action);
    }
};


module.exports = Transporter;