/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.Spawner');
 * mod.thing == 'a thing'; // true
 */

var Spawner = {
    run: function (Spawnlimit_Miner, Spawnlimit_Upgrader,Spawnlimit_Transporter,repair) {

        let Miner = _(Game.creeps).filter({memory: {role: 'Miner'}}).value().length;
        let Transporter = _(Game.creeps).filter({memory: {role: 'Transporter'}}).value().length;

        // if(_(Game.creeps).filter({memory: {role: 'Builder'}}).value().length<3&&(Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length> 0||repair === true)){
        //     Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY, CARRY, CARRY],{role: 'Builder',action: 1,target: null,way:null});
        // }

        if (Miner < Spawnlimit_Miner&&Miner<= Transporter) { //&&Miner<= Transporter
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, WORK], {
                role: 'Miner',
                source: null,
                action: 1,
                deathtimer: 50
            });

        } else if (Transporter < Spawnlimit_Transporter) {
            Game.spawns['Spawn1'].createCreep([MOVE, MOVE, CARRY,WORK], {role: 'Transporter', client: null,action: 1,actionb:1,target: null});
        } else if (_(Game.creeps).filter({memory: {role: 'Upgrader'}}).value().length < Spawnlimit_Upgrader) {
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], undefined, {
                role: 'Upgrader',
                transporter: null
            });

        }
    }

};

module.exports = Spawner;