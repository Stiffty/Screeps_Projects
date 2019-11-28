/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.Spawner');
 * mod.thing == 'a thing'; // true
 */

var Spawner = {
    run: function (Spawnlimit_Miner, Spawnlimit_Upgrader) {

        let Miner = _(Game.creeps).filter({memory: {role: 'Miner'}}).value().length;
        let Transporter = _(Game.creeps).filter({memory: {role: 'Transporter'}}).value().length;

        //console.log(Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES));
        if(_(Game.creeps).filter({memory: {role: 'Builder'}}).value().length<5){
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY],{role: 'Builder'});
        }

        if (Miner < Spawnlimit_Miner&&Miner<= Transporter) {
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, WORK], {
                role: 'Miner',
                source: null,
                deathtimer: 50
            });

        } else if (Transporter < Spawnlimit_Upgrader) {
            Game.spawns['Spawn1'].createCreep([MOVE, MOVE, CARRY], {role: 'Transporter', client: null});
        } else if (_(Game.creeps).filter({memory: {role: 'Upgrader'}}).value().length < Spawnlimit_Upgrader) {
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], undefined, {
                role: 'Upgrader',
                transporter: null
            });

        }
    }

};

module.exports = Spawner;