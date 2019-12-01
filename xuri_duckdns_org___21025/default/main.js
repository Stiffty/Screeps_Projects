var miner = require('role.Miner');
var transporter = require('role.transporter1');
var spawner = require('structure.Spawner1');
var upgrader = require('role.Upgrader');
var Architect = require('role.Architect1');
var Builder = require('role.Builder1');

module.exports.loop = function () {


    let MinerAnzahl = 0;
    let UpgraderAnzahl = 0;
    let Transporteranzahl = 0; //muss > Uprgader#

    let repair = false;
    //
    // let struct = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES);
    //
    // for(const i in struct){
    //
    //     if(struct[i].hits < struct[i].hitsMax){
    //        repair = true;
    //         break
    //     }
    // }
    // console.log(repair);


    if (Game.spawns['Spawn1'].room.controller.level === 1) {
        MinerAnzahl = 7;
        Transporteranzahl = 10;
        UpgraderAnzahl = 0;

         if(Game.spawns['Spawn1'].memory.builder1 === undefined){
             Game.spawns['Spawn1'].memory.builder1 = true;
         }
        if (Game.spawns['Spawn1'].memory.builder1 === true) {
            Game.spawns['Spawn1'].createCreep([MOVE], 'Hans', {optPath: null, role: 'Architect'});
            Architect.run(Game.creeps['Hans']);
            Game.spawns['Spawn1'].memory.builder1 = false;
        }

        //Wenn alles gebaut wurde
        if(Game.spawns['Spawn1'].room.find(FIND_MY_CONSTRUCTION_SITES).length === 0){
            Transporteranzahl = 4;
            UpgraderAnzahl = 4;
        }
        if(Game.spawns['Spawn1'].spawning === true){
            let spw = Game.spawns['Spawn1'];
            spw.room.visual.text(':tools:' + Game.creeps[spw.spawning.name].memory.action, spw.pos.x + 1, spw.pos.y, {align: 'left', opacity: 0.7});
        }else{
            spawner.run(MinerAnzahl, UpgraderAnzahl, Transporteranzahl, repair);
        }

        for (const name in Game.creeps) {

            let creep = Game.creeps[name];


            if (creep.memory.role === 'Miner') {
                miner.run(creep);
            }
            if (creep.memory.role === 'Transporter') {
                if(creep.ticksToLive<50||(Game.spawns['Spawn1'].renewCreep() === OK&&creep.ticksToLive>1400)){
                    creep.moveTo(Game.spawns['Spawn1'].pos);
                }else if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY]=== 300&&creep.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 && UpgraderAnzahl === 0) {
                    Builder.run(creep, repair);

                } else {
                    transporter.run(creep, UpgraderAnzahl);
                }

            }
            if (creep.memory.role === 'Upgrader') {

                upgrader.run(creep);
            }
        }
    } else if (Game.spawns['Spawn1'].room.controller.level === 2) {

    } else if (Game.spawns['Spawn1'].room.controller.level === 3) {

    } else if (Game.spawns['Spawn1'].room.controller.level === 4) {

    } else if (Game.spawns['Spawn1'].room.controller.level === 5) {

    }
    //     for (const name in Game.creeps) {
    //
    //     var creep = Game.creeps[name];
    //
    //
    //     if (creep.memory.role === 'Miner') {
    //
    //         miner.run(creep);
    //     }
    //     if (creep.memory.role === 'Transporter') {
    //
    //         transporter.run(creep,UpgraderAnzahl);
    //
    //     }
    //     if (creep.memory.role === 'Upgrader') {
    //
    //         upgrader.run(creep);
    //     }
    //     if(creep.memory.role === 'Builder'){
    //
    //         if(Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length === 0&& repair === false){
    //             creep.moveTo(Game.spawns['Spawn1']);
    //             Game.spawns['Spawn1'].recycleCreep(creep);
    //         }else{
    //
    //             Builder.run(creep,repair);
    //         }
    //
    //     }
    //     if(Game.spawns['Spawn1'].memory.builder === true){
    //         Game.spawns['Spawn1'].createCreep([MOVE],'Hans', {optPath: null,role: 'Architect'});
    //         Architect.run(Game.creeps['Hans']);
    //         Game.spawns['Spawn1'].memory.builder = false;
    //     }
    //
    //
    // }
    // let t = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    // for(const i in t){
    //     t[i].remove();
    // }
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
};
