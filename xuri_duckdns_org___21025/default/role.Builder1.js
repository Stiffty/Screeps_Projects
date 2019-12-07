/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Builder');
 * mod.thing == 'a thing'; // true
 */
var Builder = {

    run: function (creep) {

        let time = Game.cpu.getUsed();
        let action = creep.memory.actionb;
        let source = creep.memory.source;
        let i = 0;

        if (creep.memory.action !== 1) {
            creep.memory.action = 1;
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
        };
        let MoveToResourceUMine = {
            MoveR: function () {
                if (Game.getObjectById(source) === null) {
                    source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES).id;
                    i--;
                } else if (checkDistance.check() <= 2) {
                    if (creep.pickup(Game.getObjectById(source)) === ERR_INVALID_TARGET) {
                        source = null;
                    }
                } else {
                    creep.moveTo(Game.getObjectById(source));
                }

            }
        };

        let Builden = {

            build: function () {
                if (Game.getObjectById(source) === null) {
                    source = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES).id;
                    i--;
                } else if (checkDistance.check() <= 3) {
                    if (creep.build(Game.getObjectById(source)) !== OK) {
                       return 'Bad';
                    }
                } else {
                    creep.moveTo(Game.getObjectById(source));
                }


            }
        };

            switch (creep.memory.actionb) {
                case 1:
                    MoveToResourceUMine.MoveR();
                    if (creep.store.getFreeCapacity() === 0) {
                        source = null;
                        action = 2;
                    }
                    break
                case 2:
                    if (Builden.build() === 'Bad') {
                        source = null;
                        action = 1;
                    }
                    break
            }

        creep.memory.actionb = action;
        creep.memory.source = source;
        return (Game.cpu.getUsed() - time);

    }
};
module.exports = Builder;