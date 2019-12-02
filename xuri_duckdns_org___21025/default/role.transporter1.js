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

        let time = Game.cpu.getUsed();
        let action = creep.memory.action;
        let source = creep.memory.source;

        if (creep.memory.actionb !== 1) {
            creep.memory.actionb = 1;
        }

        let checkDistance = {
            check: function () {
                let cx = creep.pos.x;
                let cy = creep.pos.y;


                let sx = Game.getObjectById(source).pos.x;
                let sy = Game.getObjectById(source).pos.y;

                return Math.abs(cx-sx)+Math.abs(cy-sy);
            }
        }

        let MoveToResourceUMine = {
            MoveR: function () {
                if (Game.getObjectById(source) === null) {
                    source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES).id;
                } else if (checkDistance.check()<=2) {//creep.pickup(Game.getObjectById(source)) === ERR_NOT_IN_RANGE
                    if (creep.pickup(Game.getObjectById(source)) === ERR_INVALID_TARGET) {
                        source = null;
                    }
                } else{
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        };
        let SpawnFuellen = {

            fuellen: function () {
                if (source === null) {
                    source = creep.pos.findClosestByPath(FIND_MY_SPAWNS).id;
                } else if (checkDistance.check()<=2) {
                    creep.transfer(Game.getObjectById(source), RESOURCE_ENERGY);
                }else{
                    console.log(checkDistance.check());
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        };

        let Upgrader = {
            upgrader: function () {
                if (source === null) {
                    source = Game.creeps[creep.memory.client].id;
                } else if (checkDistance.check()<=2) {
                    if (Game.getObjectById(source) === null) {
                        creep.memory.client = null;
                    }
                    creep.transfer(Game.getObjectById(source), RESOURCE_ENERGY);
                }else{
                    creep.moveTo(Game.getObjectById(source));
                }


            }
        }

        let UpgraderFinden = {
            Find: function () {
                let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');

                if (Game.creeps[creep.memory.client] === undefined) {
                    creep.memory.client = null
                }
                for (const i in creeps) {
                    if (creep.memory.client === null && creeps[i].memory.transporter === null) {
                        Game.creeps[creeps[i].name].memory.transporter = creep.name;

                        creep.memory.client = Game.creeps[creeps[i].name].name;
                        break
                    }
                }
            }
        };

        if (creep.store.getFreeCapacity() > 0) {
            if (action !== 1) {
                source = null;
                action = 1;
            }
            MoveToResourceUMine.MoveR();
        } else if (creep.room.find(FIND_MY_SPAWNS)[0].store[RESOURCE_ENERGY] < 300) {
            if (action !== 2) {
                source = null;
                action = 2;
            }
            SpawnFuellen.fuellen();
        } else if (creep.memory.client !== null) {
            if (action !== 3) {
                source = null;
                action = 3;
            }
            Upgrader.upgrader();
        } else if (creep.memory.client === null) {
            UpgraderFinden.Find();
        }
        creep.memory.action = action;
        creep.memory.source = source;

        // switch (creep.memory.action) {
        //     case 1:
        //         //Resource sammeln bis voll
        //         MoveToResourceUMine.MoveR();
        //         if(creep.store.getFreeCapacity() === 0&&creep.room.find(FIND_MY_SPAWNS)[0].store[RESOURCE_ENERGY]<300){
        //             //SpawnBefüllen
        //             creep.memory.source = null;
        //             creep.memory.action = 2;
        //         }else if(creep.store.getFreeCapacity() === 0&&creep.memory.client !== null){
        //             //Upgrader befüllen
        //             creep.memory.source = null;
        //             creep.memory.action = 4;
        //         }else if(creep.store.getFreeCapacity() === 0&&creep.memory.client === null){
        //             //Upgrader finden
        //             creep.memory.action = 3;
        //         }
        //         break
        //     case 2:
        //         //SpawnBefüllen
        //         SpawnFuellen.fuellen();
        //
        //         if(Game.getObjectById(creep.memory.source).store[RESOURCE_ENERGY] === 300||creep.store.getUsedCapacity() === 0){
        //             creep.memory.source = null;
        //             creep.memory.action = 1;
        //         }
        //         break
        //     case 3:
        //         //UpgraderFinden
        //         UpgraderFinden.Find();
        //         creep.memory.action = 1;
        //         break
        //     case 4:
        //         //Upgrader befüllen
        //         Upgrader.upgrader();
        //
        //         if(Game.getObjectById(creep.memory.source) === null){
        //             creep.memory.client = null;
        //         }
        //
        //         if(creep.store.getUsedCapacity() === 0||creep.memory.client === null){
        //             creep.memory.source = null;
        //             creep.memory.action = 1;
        //         }
        //         break
        // }

        return (Game.cpu.getUsed() - time);


        // let rounds = 2;
        // for (let i = 0; i < rounds; i++) {
        //
        //     switch (creep.memory.action) {
        //
        //         case 1:
        //             //Find Recource
        //             let source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        //             if (source !== null) {
        //                 creep.memory.way = creep.room.findPath(creep.pos, source.pos);
        //                 creep.memory.target = source.id;
        //             }
        //             if (creep.memory.client !== null&&creep.store.getFreeCapacity() === 0) {
        //                let str = creep.room.find(FIND_STRUCTURES);
        //                for (const i in str ){
        //                    if(str[i].structureType === STRUCTURE_CONTAINER&&str[i].store.getUsedCapacity()>creep.store.getCapacity()){
        //                        let way2 = creep.room.findPath(creep.pos, str[i].pos);
        //                        if(way2.length<= creep.memory.way.length) {
        //                            creep.memory.target = str[i].id;
        //                            creep.memory.action = 14;
        //                            break
        //                        }
        //
        //                    }
        //                }
        //
        //             }else if (creep.memory.client === null) {
        //                 console.log('HI');
        //                 creep.memory.action= 10;
        //             }else{
        //                 creep.memory.action = 4;
        //             }
        //             creep.memory.action = 4;
        //
        //
        //
        //             break
        //         case 2:
        //             //Find Spawn
        //             let spawn = creep.room.find(FIND_MY_SPAWNS);
        //             creep.memory.way = creep.room.findPath(creep.pos, spawn[0].pos);
        //             creep.memory.target = spawn[0].id;
        //             creep.moveTo(creep.memory.way[0].x, creep.memory.way[0].y);
        //
        //             creep.memory.action = 5;
        //             break
        //         case 3:
        //             //Find Client
        //             if (creep.memory.client !== null) {
        //                 let client = Game.creeps[creep.memory.client];
        //                 creep.memory.way = creep.room.findPath(creep.pos, client.pos);
        //                 creep.memory.target = client.id;
        //
        //                 creep.memory.action = 6;
        //             } else {
        //                 //Container
        //                 if(creep.store.getUsedCapacity()<creep.store.getCapacity()){
        //                     creep.memory.action = 4;
        //                 }else{
        //                     creep.memory.action = 11;
        //                 }
        //
        //             }
        //             break
        //         case 4:
        //             //Moveto Reccource
        //             if (creep.moveTo(Game.getObjectById(creep.memory.target)) === ERR_INVALID_TARGET) {
        //                 creep.memory.action = 1;
        //             }
        //
        //             if (creep.pickup(Game.getObjectById(creep.memory.target)) === OK||creep.pickup(Game.getObjectById(creep.memory.target)) === ERR_FULL) {
        //                 creep.memory.action = 7;
        //             }
        //             break
        //         case 5:
        //             //MoveTo Spawn
        //             creep.moveTo(Game.getObjectById(creep.memory.target));
        //
        //             if (creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) === OK) {
        //                 creep.memory.action = 8;
        //             } else if (creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) === ERR_FULL) {
        //                 creep.memory.action = 10;
        //             }
        //             break
        //         case 6:
        //             //MoveTo Client
        //             creep.moveTo(Game.creeps[creep.memory.client]);
        //             if (creep.transfer(Game.creeps[creep.memory.client], RESOURCE_ENERGY) === OK) {
        //                 creep.memory.action = 9;
        //             }
        //             break
        //         case 7:
        //             //Pickup
        //             if (creep.pickup(Game.getObjectById(creep.memory.target)) !== OK && creep.store.getUsedCapacity() !== creep.store.getCapacity()) {
        //                 creep.memory.action = 1;
        //             } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
        //                 if (creep.room.find(FIND_MY_SPAWNS)[0].store[RESOURCE_ENERGY] < 300) {
        //
        //                     creep.memory.action = 2;
        //                 } else if (creep.memory.client !== null&&creep.store.getFreeCapacity() === 0) {
        //                     let str = creep.room.find(FIND_STRUCTURES);
        //                     for (const i in str ){
        //                         if(str[i].structureType === STRUCTURE_CONTAINER&&str[i].store.getUsedCapacity()>creep.store.getCapacity()){
        //                             let way2 = creep.room.findPath(creep.pos, str[i].pos);
        //                             if(way2.length<= creep.memory.way.length) {
        //                                 creep.memory.target = str[i].id;
        //                                 creep.memory.action = 14;
        //                                 break
        //                             }
        //
        //                         }
        //                     }
        //
        //                 }else {
        //
        //                     creep.memory.action = 10;
        //                 }
        //
        //             }
        //             break
        //         case 8:
        //
        //             creep.transfer(creep.memory.target, RESOURCE_ENERGY);
        //             creep.memory.action = 1;
        //             break
        //         case 9:
        //             creep.transfer(Game.creeps[creep.memory.client], RESOURCE_ENERGY);
        //             if (creep.store.getUsedCapacity() === 0) {
        //                 creep.memory.action = 1;
        //             }
        //             break
        //         case 10:
        //
        //             if(creep.store.getUsedCapacity()!== creep.store.getCapacity()){
        //                 creep.memory.action = 1;
        //             }else {
        //                 creep.memory.action = 3;
        //             }creep.memory.action = 3;
        //
        //
        //             break
        //         case 11:
        //             //FindContainer
        //             let Structures = creep.room.find(FIND_STRUCTURES);
        //             for (const i in Structures){
        //                 if(Structures[i].structureType === STRUCTURE_CONTAINER&&Structures[i].store.getUsedCapacity()< Structures[i].store.getCapacity()){
        //                     creep.memory.target = Structures[i].id;
        //                     break
        //                 }
        //             }
        //             if(Game.getObjectById(creep.memory.target).structureType === STRUCTURE_CONTAINER){
        //                 creep.memory.action = 12;
        //             }
        //             else{
        //                 creep.memory.action = 1;
        //             }
        //
        //             break
        //         case 12:
        //             //Move to Container
        //             console.log(Game.getObjectById(creep.memory.target));
        //             creep.moveTo(Game.getObjectById(creep.memory.target));
        //             if (creep.transfer(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === OK) {
        //                 creep.memory.action = 13;
        //             }else if(creep.transfer(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === ERR_FULL){
        //                 creep.memory.action = 1;
        //             }
        //             break
        //         case 13:
        //             //Transfer Container
        //             creep.transfer(Game.getObjectById(creep.memory.target));
        //             if(creep.store.getUsedCapacity() === 0) {
        //                 creep.memory.action = 1;
        //             }
        //         break
        //         case 14:
        //             if (creep.moveTo(Game.getObjectById(creep.memory.target)) === ERR_INVALID_TARGET) {
        //                 creep.memory.action = 1;
        //             }
        //
        //             if (creep.withdraw(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === OK||creep.withdraw(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) === ERR_FULL) {
        //                 creep.memory.action = 15;
        //             }
        //             break
        //         case 15:
        //             if (creep.withdraw(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) !== OK && creep.store.getUsedCapacity() !== creep.store.getCapacity()) {
        //                 creep.memory.action = 1;
        //             } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
        //                 if (creep.room.find(FIND_MY_SPAWNS)[0].store[RESOURCE_ENERGY] < 300) {
        //                     rounds++;
        //                     creep.memory.action = 2;
        //                 } else {
        //                     rounds++;
        //                     creep.memory.action = 10;
        //                 }
        //
        //             }
        //             break
        //     }
        //
        // }
        // creep.say('T' +  creep.memory.action);
    }
};


module.exports = Transporter;