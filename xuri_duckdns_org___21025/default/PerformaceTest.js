/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('PerformaceTest');
 * mod.thing == 'a thing'; // true
 */

let test = {

    run: function (spawn) {
        let time = Game.cpu.getUsed();
        //First



//End
        console.log(Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, 32, 29) + '  First: ' + (Game.cpu.getUsed() - time));
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
        console.log(' Second: ' + (Game.cpu.getUsed() - time));

    }
};

module.exports = test;