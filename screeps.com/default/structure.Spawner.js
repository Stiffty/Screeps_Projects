/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.Spawner');
 * mod.thing == 'a thing'; // true
 */

var Spawner = {
    run: function () {
        var Spawnlimit_Miner = 3;
        var Spawnlimit_Upgrader = 6;


        if (_(Game.creeps).filter({ memory: {role: 'Miner' }}).value().length < (Spawnlimit_Miner)) {

            var typ = Game.spawns['Spawn1'].memory.typ;
            console.log(typ);
            if (typ === 1) {
               if( Game.spawns['Spawn1'].createCreep([WORK, MOVE, WORK], {
                   
                    role: 'Miner',
                    source: null
                })!== ERR_NOT_ENOUGH_ENERGY){
                   typ = 2;
                   Game.spawns['Spawn1'].memory.typ = typ;
               }
                return;
            } else if (typ === 2) {
                if(Game.spawns['Spawn1'].createCreep([MOVE, MOVE, CARRY],{role: 'Transporter',client: null})!== ERR_NOT_ENOUGH_ENERGY){
                    typ = 1;
                    Game.spawns['Spawn1'].memory.typ = typ;
                }
               

            }

        }else if (_(Game.creeps).filter({ memory: { role: 'Upgrader' }}).value().length < Spawnlimit_Upgrader) {
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], undefined, {
                role: 'Upgrader',
                transporter: null
            });
            if(_(Game.creeps).filter({ memory: { role: 'Transporter' }}).value().length < Spawnlimit_Upgrader){
                Game.spawns['Spawn1'].createCreep([MOVE, MOVE, CARRY],{role: 'Transporter',client: null});
            }
        }
    }

};

module.exports = Spawner;