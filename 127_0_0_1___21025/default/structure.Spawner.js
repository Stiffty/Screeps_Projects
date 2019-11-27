/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.Spawner');
 * mod.thing == 'a thing'; // true
 */

var Spawner = {
    run: function (Spawnlimit_Miner,Spawnlimit_Upgrader) {

        if (_(Game.creeps).filter({ memory: {role: 'Miner' }}).value().length < Spawnlimit_Miner) {
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, WORK], {
                role: 'Miner',
                source: null
            },{dryRun: true});

        }
        if(_(Game.creeps).filter({ memory: { role: 'Transporter' }}).value().length < Spawnlimit_Upgrader){
            Game.spawns['Spawn1'].createCreep([MOVE, MOVE, CARRY],{role: 'Transporter',client: null});
        }else if (_(Game.creeps).filter({ memory: { role: 'Upgrader' }}).value().length < Spawnlimit_Upgrader) {
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], undefined, {
                role: 'Upgrader',
                transporter: null
            });

        }
    }

};

module.exports = Spawner;