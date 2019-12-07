/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var Transporter = {


    run: function (creep,  Upgraderanz,upgrader) {

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

                let x = Math.abs(cx-sx);
                let y = Math.abs(cy-sy);

                let final = x+y;
                if(x === 0||y === 0){
                    final++;
                }

                return final;
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
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        };

        let CointainerFüllen = {
            container: function () {
                if (source === null) {
                    source = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                        filter: function(object) {
                            if(object.structureType === STRUCTURE_CONTAINER){
                                if(object.store.getFreeCapacity()>creep.store.getCapacity()){
                                    return object;
                                }
                            }
                        }
                    });
                    if(source !== null){
                        source = source.id;
                    }
                } else if (checkDistance.check()<=2) {
                    creep.transfer(Game.getObjectById(source), RESOURCE_ENERGY);
                }else{
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        }

        let Upgrader = {
            upgrader: function () {
                if (source === null) {
                    let t = Game.creeps[creep.memory.client];
                    if(t === undefined){
                        creep.memory.client = null;
                    }else{
                        source = Game.creeps[creep.memory.client].id;
                    }
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
            if (action !== 4) {
                source = null;
                action = 4;
            }
            UpgraderFinden.Find();
            CointainerFüllen.container();//Fix error Null
        }
        creep.memory.action = action;
        creep.memory.source = source;


        return (Game.cpu.getUsed() - time);

    }
};


module.exports = Transporter;