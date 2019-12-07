var lvl1 = require('Lvl1');
var lvl2 = require('Lvl2');
var lvl3 = require('Lvl3');



module.exports.loop = function () {

    let spawn = Game.spawns['Spawn1'];

    //PTest.run(spawn);

    switch (spawn.room.controller.level) {

        case 1:
            lvl1.run(spawn);
            break
        case 2:
            lvl2.run(spawn);
            break
        case 3:
            lvl3.run(spawn);
            break
    }

    // let t = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
    // for(const i in t){
    //     t[i].remove();
    // }

    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
};