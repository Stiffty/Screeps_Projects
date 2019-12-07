/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Lvl3');
 * mod.thing == 'a thing'; // true
 */
var miner = require('role.Miner');
var upgrader = require('role.Upgrader');
var spawner = require('structure.Spawner2');
var Architect = require('role.Architect2');
var transporter = require('role.transporter3');
var Builder = require('role.Builder1');
let tower = require('structure.Tower');
let transfer = require('role.transfer');
let PTest = require('PerformaceTest');


let renewCreep = require('action.renew');
//LVL 3
let lvl = {
    run:function (spawn) {

        let MinerAnzahl = 7;
        let UpgraderAnzahl = 0;
        let Transporteranzahl = 10; //muss > Uprgader#

        let timeTransporter = 0;
        let timeSpawn = 0;
        let timeMiner = 0;
        let timeUpgrader = 0;
        let timeBuilder = 0;
        let time = 0;

        //PTest.run(spawn);
        //Architect.run(spawn);

        let creeps = Game.creeps;
        let Miner = 0;
        let Transporter = 0;
        let Upgrader = 0;
        let Transfer = 2;

        for (const i in creeps) {
            if (creeps[i].memory.role === 'Transporter') {
                Transporter++;
            } else if (creeps[i].memory.role === 'Upgrader') {
                Upgrader++;
            } else if (creeps[i].memory.role === 'Miner') {
                Miner++;
            }
        }

        if (Game.spawns['Spawn1'].memory.builder3 === undefined) {
            Game.spawns['Spawn1'].memory.builder3 = true;
        }else if (Game.spawns['Spawn1'].memory.builder3 === true) {
            Architect.run(spawn);
            Game.spawns['Spawn1'].memory.builder3 = false;
        }

        //Wenn alles gebaut wurde
        if (Game.spawns['Spawn1'].room.find(FIND_MY_CONSTRUCTION_SITES).length === 0) {
            Transporteranzahl = 6;
            UpgraderAnzahl = 1;
        }
        if (spawn.spawning === true) {
            let spw = Game.spawns['Spawn1'];
            spw.room.visual.text(':tools:' + Game.creeps[spw.spawning.name].memory.action, spw.pos.x + 1, spw.pos.y, {
                align: 'left',
                opacity: 0.7
            });
        } else {
            time = spawner.run(MinerAnzahl, UpgraderAnzahl, Transporteranzahl, Transfer);
            if (time > timeSpawn) {
                timeSpawn = time;
            }
        }
        tower.run(spawn);

        for (const name in Game.creeps) {

            let creep = Game.creeps[name];

            if ((creep.memory.renew !== undefined ||creep.ticksToLive < 50) &&Transporteranzahl === Transporter&&MinerAnzahl === Miner&&UpgraderAnzahl === Upgrader) {
                creep.memory.renew = true;
                renewCreep.run(creep,spawn);
            }


            if (creep.memory.role === 'Miner') {
                time = miner.run(creep);
                if (time > timeMiner) {
                    timeMiner = time;
                }
            }else if (creep.memory.role === 'Transporter') {
                 if ((Game.spawns['Spawn1'].store[RESOURCE_ENERGY] === 300 && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 && UpgraderAnzahl === 0)||(Game.spawns['Spawn1'].store[RESOURCE_ENERGY] === 300 && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 &&transporter>upgrader&&creep.memory.client === null)) {
                    time = Builder.run(creep);
                    if (time > timeBuilder) {
                        timeBuilder = time;
                    }

                } else {
                    time = transporter.run(creep, UpgraderAnzahl,Upgrader);
                    if (time > timeTransporter) {
                        timeTransporter = time;
                    }
                }

            }else if (creep.memory.role === 'Upgrader') {
                time = upgrader.run(creep);
                if (time > timeUpgrader) {
                    timeUpgrader = time;
                }
            }else if(creep.memory.role === 'transfer'){
                transfer.run(creep);
            }
        }
        console.log('Miner: ' + timeMiner.toFixed(3) + ' Spawn: ' + timeSpawn.toFixed(3) + ' Builder: ' + timeBuilder.toFixed(3) + ' Transporter: ' + timeTransporter.toFixed(3) + ' Upgrader: ' + timeUpgrader.toFixed(3) + " All in All " + Game.cpu.getUsed() + " ms");
    }
};


module.exports =lvl;