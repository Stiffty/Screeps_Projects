/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Lvl2');
 * mod.thing == 'a thing'; // true
 */
var miner = require('role.Miner');
var upgrader = require('role.Upgrader');
var spawner = require('structure.Spawner2');
var Architect = require('role.Architect2');
var transporter = require('role.transporter3');
var Builder = require('role.Builder1');

let renewCreep = require('action.renew');
//LVL 2
let lvl = {
    run: function (spawn) {
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

        let creeps = Game.creeps;
        let Miner = 0;
        let Transporter = 0;
        let Upgrader = 0;

        for (const i in creeps) {
            if (creeps[i].memory.role === 'Transporter') {
                Transporter++;
            } else if (creeps[i].memory.role === 'Upgrader') {
                Upgrader++;
            } else if (creeps[i].memory.role === 'Miner') {
                Miner++;
            }
        }


        if (Game.spawns['Spawn1'].memory.builder2 === undefined) {
            Game.spawns['Spawn1'].memory.builder2 = true;
        } else if (Game.spawns['Spawn1'].memory.builder2 === true) {
            Architect.run(spawn);
            Game.spawns['Spawn1'].memory.builder2 = false;
        }

        //Wenn alles gebaut wurde
        if (Game.spawns['Spawn1'].room.find(FIND_MY_CONSTRUCTION_SITES).length === 0) {
            Transporteranzahl = 6;
            UpgraderAnzahl = 6;
        }

        time = spawner.run(MinerAnzahl, UpgraderAnzahl, Transporteranzahl, spawn);
        if (time > timeSpawn) {
            timeSpawn = time;
        }


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
            } else if (creep.memory.role === 'Transporter') {
                if ((Game.spawns['Spawn1'].store[RESOURCE_ENERGY] === 300 && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 && UpgraderAnzahl === 0)) {
                    time = Builder.run(creep, repair);
                    if (time > timeBuilder) {
                        timeBuilder = time;
                    }

                } else if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] === 300 && transporter > upgrader && creep.memory.client === null) {

                } else {
                    time = transporter.run(creep, transporter, upgrader);
                    if (time > timeTransporter) {
                        timeTransporter = time;
                    }
                }

            } else if (creep.memory.role === 'Upgrader') {
                time = upgrader.run(creep);
                if (time > timeUpgrader) {
                    timeUpgrader = time;
                }
            }
        }
        console.log('Miner: ' + timeMiner.toFixed(3) + ' Spawn: ' + timeSpawn.toFixed(3) + ' Builder: ' + timeBuilder.toFixed(3) + ' Transporter: ' + timeTransporter.toFixed(3) + ' Upgrader: ' + timeUpgrader.toFixed(3) + " All in All " + Game.cpu.getUsed() + " ms");

    }
};


module.exports = lvl;