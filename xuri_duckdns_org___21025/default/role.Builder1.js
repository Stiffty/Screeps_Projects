/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Builder');
 * mod.thing == 'a thing'; // true
 */
var Builder = {

    run: function (creep, repair) {


        if (creep.memory.action !== 1) {
            creep.memory.action = 1;
        }
        let i = 0;
        let MoveToResourceUMine = {
            MoveR: function () {
                if (creep.memory.source === null) {
                    creep.memory.source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES).id;
                    i--;
                } else if (creep.pickup(Game.getObjectById(creep.memory.source)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.source));
                } else if (creep.pickup(Game.getObjectById(creep.memory.source)) === ERR_INVALID_TARGET) {
                    creep.memory.source = null;
                }

            }
        };

        let Builden = {

            build: function () {
                if (creep.memory.source === null) {
                    creep.memory.source = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES).id;
                    i--;
                } else if (creep.build(Game.getObjectById(creep.memory.source)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.source));
                } else if (creep.build(Game.getObjectById(creep.memory.source)) !== OK) {
                    return 'Bad';
                }
            }
        };

        for (i ;i<2;i++) {
            switch (creep.memory.actionb) {
                case 1:
                    MoveToResourceUMine.MoveR();
                    if (creep.store.getUsedCapacity() > 0) {
                        creep.memory.source = null;
                        creep.memory.actionb = 2;
                    }
                    break
                case 2:
                    if (Builden.build() === 'Bad') {
                        creep.memory.source = null;
                        creep.memory.actionb = 1;
                    }
                    break
            }
        }

        // let rounds = 3;
        // for (let i = 0; i < rounds; i++) {
        //     switch (creep.memory.action) {
        //         case 1:
        //             //Find Rec
        //
        //             let source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        //             if (source === null) {
        //                 source = creep.room.find(FIND_SOURCES)[0];
        //             }
        //             creep.memory.way = creep.room.findPath(creep.pos, source.pos);
        //             creep.memory.target = source.id;
        //             rounds++;
        //             creep.memory.action = 3;
        //             break
        //         case 2:
        //             //Find ConstSide
        //             let ConstSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        //             if (ConstSite !== null) {
        //                 creep.memory.way = creep.room.findPath(creep.pos, ConstSite.pos);
        //                 creep.memory.target = ConstSite.id;
        //             }
        //             rounds++;
        //             creep.memory.action = 4;
        //             break
        //         case 3:
        //             //Moveto Rec
        //
        //             if (creep.moveTo(Game.getObjectById(creep.memory.target)) === ERR_INVALID_TARGET) {
        //                 creep.memory.action = 1;
        //             }
        //
        //             if (creep.pickup(Game.getObjectById(creep.memory.target)) === OK) {
        //                 creep.memory.action = 5;
        //             }
        //             break
        //         case 4:
        //             //Move ro Constside
        //             creep.moveTo(Game.getObjectById(creep.memory.target));
        //
        //             let Error = creep.build(creep.build(Game.getObjectById(creep.memory.target)));
        //             if (Error === OK) {
        //                 creep.memory.action = 6;
        //             } else if (Error === ERR_NOT_ENOUGH_RESOURCES) {
        //                 creep.memory.action = 1;
        //             } else if (Error === ERR_INVALID_TARGET) {
        //                 creep.memory.action = 2;
        //             }
        //             break
        //         case 5:
        //             //Pickup
        //             creep.pickup(Game.getObjectById(creep.memory.target));
        //             if (creep.pickup(Game.getObjectById(creep.memory.target)) !== OK && creep.store.getUsedCapacity() !== creep.store.getCapacity()) {
        //                 creep.memory.action = 1;
        //             } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
        //                 rounds++;
        //                 if (repair === true) {
        //                     let struct = creep.room.find(FIND_STRUCTURES);
        //                     for (const name in struct) {
        //                         if (struct[i].hits < struct[i].hitsMax) {
        //                             creep.memory.target = struct[i].id;
        //                             creep.memory.action = 7;
        //                             break
        //                         }
        //                     }
        //                 } else {
        //                     creep.memory.action = 2;
        //                 }
        //
        //             }
        //             break
        //         case 6:
        //             //Build
        //             creep.build(creep.build(Game.getObjectById(creep.memory.target)));
        //             if (creep.store.getUsedCapacity() === 0) {
        //                 rounds++;
        //                 creep.memory.action = 1;
        //             }
        //             break
        //         case 7:
        //             creep.moveTo(Game.getObjectById(creep.memory.target));
        //             if (creep.repair(Game.getObjectById(creep.memory.target)) === OK) {
        //                 creep.memory.action = 8;
        //             }
        //             break
        //         case 8:
        //             creep.repair(Game.getObjectById(creep.memory.target));
        //             if (Game.getObjectById(creep.memory.target).hits === Game.getObjectById(creep.memory.target).hitsMax || creep.store.getUsedCapacity() === 0) {
        //                 creep.memory.action = 1;
        //             } else if (Game.getObjectById(creep.memory.target).hits === Game.getObjectById(creep.memory.target).hitsMax && creep.store.getUsedCapacity() !== 0) {
        //                 let struct = creep.room.find(FIND_STRUCTURES);
        //                 for (const name in struct) {
        //                     if (struct[i].hits < struct[i].hitsMax) {
        //                         creep.memory.target = struct[i].id;
        //                         creep.memory.action = 7;
        //                         break
        //                     }
        //                 }
        //             }
        //             break
        //     }
        //     creep.say('B' + creep.memory.action);
        // }
    }
};
module.exports = Builder;