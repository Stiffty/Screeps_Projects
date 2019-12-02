/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('PerformaceTest');
 * mod.thing == 'a thing'; // true
 */

let test = {

    run: function () {
        let time = Game.cpu.getUsed();
        //First

        //let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');

        // let cx = creep.pos.x;
        // let cy = creep.pos.y;
        //
        // let sx = Game.getObjectById(source).pos.x;
        // let sy = Game.getObjectById(source).pos.y;

        let cx = 1;
        let cy = 5;

        let sx = 3;
        let sy = 3;

        let final = Math.abs(cx-sx)+Math.abs(cy-sy);
        //End
        console.log( final  + '  First: '+  (Game.cpu.getUsed()-time));
        time = Game.cpu.getUsed();

        //Versus


        // let count = 0;
        // let creeps1 = Game.creeps;
        // for(const i in creeps1){
        //     if(creeps1[i].memory.role === 'Upgrader'){
        //         count++;
        //     }
        // }
        //End
        console.log( ' Second: '+  (Game.cpu.getUsed()-time));
    }

};

module.exports = test;