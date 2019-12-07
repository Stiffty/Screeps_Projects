/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transfer');
 * mod.thing == 'a thing'; // true
 */


let transfer = {

    run: function (creep) {

        let action = creep.memory.action;
        let source = creep.memory.source;

        let checkDistance = {
            check: function () {
                let cx = creep.pos.x;
                let cy = creep.pos.y;

                let sx = Game.getObjectById(source).pos.x;
                let sy = Game.getObjectById(source).pos.y;

                let x = Math.abs(cx - sx);
                let y = Math.abs(cy - sy);

                let final = x + y;
                if (x === 0 || y === 0) {
                    final++;
                }

                return final;
            }
        }

        let MoveToResourceUMine = {
            MoveR: function () {
                if (Game.getObjectById(source) === null) {
                    source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES).id;
                } else if (checkDistance.check() <= 2) {//creep.pickup(Game.getObjectById(source)) === ERR_NOT_IN_RANGE
                    if (creep.pickup(Game.getObjectById(source)) === ERR_INVALID_TARGET) {
                        source = null;
                    }
                } else {
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        };
        let PickupContainer = {
            container: function () {
                if (Game.getObjectById(source) === null) {
                    source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (c) => c.structureType === STRUCTURE_CONTAINER &&c.store[RESOURCE_ENERGY]> creep.store.getCapacity(RESOURCE_ENERGY)}).id;
                } else if (checkDistance.check() <= 2) {//creep.pickup(Game.getObjectById(source)) === ERR_NOT_IN_RANGE
                    if (creep.withdraw(Game.getObjectById(source),RESOURCE_ENERGY) === ERR_INVALID_TARGET) {
                        source = null;
                    }
                } else {
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        };

        let TowerFüllen = {
            tower: function () {
                if (source === null) {
                    source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (c) => c.structureType === STRUCTURE_TOWER && c.store[RESOURCE_ENERGY]< c.store.getCapacity(RESOURCE_ENERGY)}).id;
                } else if (checkDistance.check() <= 2) {
                    creep.transfer(Game.getObjectById(source), RESOURCE_ENERGY);
                } else {
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        }
        let ExtentionFüllen = {
            tower: function () {
                if (source === null) {
                    source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (c) => c.structureType === STRUCTURE_EXTENSION && c.store[RESOURCE_ENERGY]< c.store.getCapacity(RESOURCE_ENERGY)}).id;
                } else if (checkDistance.check() <= 2) {
                    creep.transfer(Game.getObjectById(source), RESOURCE_ENERGY);
                } else {
                    creep.moveTo(Game.getObjectById(source));
                }
            }
        };

        if (creep.store.getFreeCapacity() > 0) {
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (c) => c.structureType === STRUCTURE_CONTAINER &&c.store[RESOURCE_ENERGY]> creep.store.getCapacity(RESOURCE_ENERGY)});
            if (container !== null) {
                if (action !== 1) {
                    action = 1;
                    source = null;
                }
                PickupContainer.container();
            } else {
                if (action !== 2) {
                    action = 2;
                    source = null;
                }
                MoveToResourceUMine.MoveR();
            }
        } else if (creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (c) => c.structureType === STRUCTURE_TOWER && c.store[RESOURCE_ENERGY]< c.store.getCapacity(RESOURCE_ENERGY)})) {
            if (action !== 3) {
                action = 3;
                source = null;
            }
            TowerFüllen.tower();

        } else if (creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (c) => c.structureType === STRUCTURE_EXTENSION && c.store[RESOURCE_ENERGY]< c.store.getCapacity(RESOURCE_ENERGY)})) {
            if (action !== 4) {
                action = 4;
                source = null;
            }
            ExtentionFüllen.tower();
        }

        creep.memory.action = action;
        creep.memory.source = source;
    }
}

module.exports = transfer;