/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Lvl1');
 * mod.thing == 'a thing'; // true
 */
var miner = require('role.Miner');
var transporter = require('role.transporter1_2');
var spawner = require('structure.Spawner1');
var upgrader = require('role.Upgrader');
var Architect = require('role.Architect1');
var Builder = require('role.Builder1');

let renewCreep = require('action.renew');

//LVL 1
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

        if (spawn.memory.builder1 === undefined) {
            spawn.memory.builder1 = true;
        }else if (spawn.memory.builder1 === true) {
            Architect.run(spawn);
            spawn.memory.builder1 === false;
        }

        //Wenn alles gebaut wurde
        if (spawn.room.find(FIND_MY_CONSTRUCTION_SITES).length === 0) {
            Transporteranzahl = 4;
            UpgraderAnzahl = 4;
        }
        if (spawn.spawning === true) {
            let spw = spawn;
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
                if ((spawn.store[RESOURCE_ENERGY] === 300 && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 && UpgraderAnzahl === 0)) {
                    time = Builder.run(creep);
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
        console.log('Miner: ' + timeMiner.toFixed(3) + ' Spawn: ' + timeSpawn.toFixed(3) + ' Builder: ' + timeBuilder.toFixed(3) + ' Transporter: ' + timeTransporter.toFixed(3) + ' Upgrader: ' + timeUpgrader.toFixed(3) + " All in All " + Game.cpu.getUsed() + " ms");
    }
};


module.exports =lvl;