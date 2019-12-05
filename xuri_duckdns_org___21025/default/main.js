var miner = require('role.Miner');
var transporter = require('role.transporter1');
var spawner = require('structure.Spawner1');
var upgrader = require('role.Upgrader');
var Architect = require('role.Architect1');
var Builder = require('role.Builder1');
var PTest = require('PerformaceTest');
var Architect2 = require('role.Architect2');

module.exports.loop = function () {

    let spawn = Game.spawns['Spawn1'];

    let MinerAnzahl = 0;
    let UpgraderAnzahl = 0;
    let Transporteranzahl = 0; //muss > Uprgader#

    let timeTransporter = 0;
    let timeSpawn = 0;
    let timeMiner = 0;
    let timeUpgrader = 0;
    let timeBuilder = 0;
    let time = 0;

    let repair = false;
    //PTest.run(spawn);
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

    switch (spawn.room.controller.level) {

        case 1:
            MinerAnzahl = 7;
            Transporteranzahl = 10;
            UpgraderAnzahl = 0;


            if (Game.spawns['Spawn1'].memory.builder3 === undefined) {
                Game.spawns['Spawn1'].memory.builder3 = true;
            }else if (Game.spawns['Spawn1'].memory.builder3 === true) {
                Architect.run(spawn);
                Game.spawns['Spawn1'].memory.builder3 === false;
            }

            //Wenn alles gebaut wurde
            if (Game.spawns['Spawn1'].room.find(FIND_MY_CONSTRUCTION_SITES).length === 0) {
                Transporteranzahl = 4;
                UpgraderAnzahl = 4;
            }
            if (spawn.spawning === true) {
                let spw = Game.spawns['Spawn1'];
                spw.room.visual.text(':tools:' + Game.creeps[spw.spawning.name].memory.action, spw.pos.x + 1, spw.pos.y, {
                    align: 'left',
                    opacity: 0.7
                });
            } else {
                time = spawner.run(MinerAnzahl, UpgraderAnzahl, Transporteranzahl, spawn);
                if (time > timeSpawn) {
                    timeSpawn = time;
                }
            }

            for (const name in Game.creeps) {

                let creep = Game.creeps[name];


                if (creep.memory.role === 'Miner') {
                    time = miner.run(creep);
                    if (time > timeMiner) {
                        timeMiner = time;
                    }
                }else if (creep.memory.role === 'Transporter') {
                    if (creep.ticksToLive < 50 || (Game.spawns['Spawn1'].renewCreep() === OK && creep.ticksToLive > 1400)) {
                        creep.moveTo(Game.spawns['Spawn1'].pos);
                    } else if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] === 300 && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 && UpgraderAnzahl === 0) {
                        time = Builder.run(creep, repair);
                        if (time > timeBuilder) {
                            timeBuilder = time;
                        }

                    } else {
                        time = transporter.run(creep, UpgraderAnzahl);
                        if (time > timeTransporter) {
                            timeTransporter = time;
                        }
                    }

                }else if (creep.memory.role === 'Upgrader') {
                    time = upgrader.run(creep);
                    if (time > timeUpgrader) {
                        timeUpgrader = time;
                    }
                }
            }
            break
        case 2:
            MinerAnzahl = 7;
            Transporteranzahl = 10;
            UpgraderAnzahl = 0;


            if (Game.spawns['Spawn1'].memory.builder3 === undefined) {
                Game.spawns['Spawn1'].memory.builder3 = true;
            }else if (Game.spawns['Spawn1'].memory.builder3 === true) {
                Architect.run(spawn);
                Game.spawns['Spawn1'].memory.builder3 = false;
            }

            //Wenn alles gebaut wurde
            if (Game.spawns['Spawn1'].room.find(FIND_MY_CONSTRUCTION_SITES).length === 0) {
                Transporteranzahl = 4;
                UpgraderAnzahl = 4;
            }
            if (spawn.spawning === true) {
                let spw = Game.spawns['Spawn1'];
                spw.room.visual.text(':tools:' + Game.creeps[spw.spawning.name].memory.action, spw.pos.x + 1, spw.pos.y, {
                    align: 'left',
                    opacity: 0.7
                });
            } else {
                time = spawner.run(MinerAnzahl, UpgraderAnzahl, Transporteranzahl, spawn);
                if (time > timeSpawn) {
                    timeSpawn = time;
                }
            }

            for (const name in Game.creeps) {

                let creep = Game.creeps[name];


                if (creep.memory.role === 'Miner') {
                    time = miner.run(creep);
                    if (time > timeMiner) {
                        timeMiner = time;
                    }
                }else if (creep.memory.role === 'Transporter') {
                    if (creep.ticksToLive < 50 || (Game.spawns['Spawn1'].renewCreep() === OK && creep.ticksToLive > 1400)) {
                        creep.moveTo(Game.spawns['Spawn1'].pos);
                    } else if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] === 300 && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 && UpgraderAnzahl === 0) {
                        time = Builder.run(creep, repair);
                        if (time > timeBuilder) {
                            timeBuilder = time;
                        }

                    } else {
                        time = transporter.run(creep, UpgraderAnzahl);
                        if (time > timeTransporter) {
                            timeTransporter = time;
                        }
                    }

                }else if (creep.memory.role === 'Upgrader') {
                    time = upgrader.run(creep);
                    if (time > timeUpgrader) {
                        timeUpgrader = time;
                    }
                }
            }
            break
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
    console.log('Miner: ' + timeMiner.toFixed(3) + ' Spawn: ' + timeSpawn.toFixed(3) + ' Builder: ' + timeBuilder.toFixed(3) + ' Transporter: ' + timeTransporter.toFixed(3) + ' Upgrader: ' + timeUpgrader.toFixed(3) + " All in All " + Game.cpu.getUsed() + " ms");
};
