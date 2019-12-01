var miner = require('role.Miner');
var transporter = require('role.transporter');
var spawner = require('structure.Spawner');
var upgrader = require('role.Upgrader');
var Architect = require('role.Architect');
var Builder = require('role.Builder');

module.exports.loop = function () {


    let MinerAnzahl = 3;
    let UpgraderAnzahl = 3;
    let Transporteranzahl = 6; //muss > Uprgader#
    let repair = false;

    let struct = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES);

    for(const i in struct){

        if(struct[i].hits < struct[i].hitsMax){
           repair = true;
            break
        }
    }
    console.log(repair);
    spawner.run(MinerAnzahl,UpgraderAnzahl,Transporteranzahl,repair);


    for (const name in Game.creeps) {

        var creep = Game.creeps[name];

        
        // let t = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        // for(const i in t){
        //     t[i].remove();
        // }

        if (creep.memory.role === 'Miner') {

            miner.run(creep);
        }
        if (creep.memory.role === 'Transporter') {

            transporter.run(creep,UpgraderAnzahl);
        }
        if (creep.memory.role === 'Upgrader') {

            upgrader.run(creep);
        }
        if(creep.memory.role === 'Builder'){

            if(Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length === 0&& repair === false){
                creep.moveTo(Game.spawns['Spawn1']);
                Game.spawns['Spawn1'].recycleCreep(creep);
            }else{

                Builder.run(creep,repair);
            }

        }
        if(Game.spawns['Spawn1'].memory.builder === true){
            Game.spawns['Spawn1'].createCreep([MOVE],'Hans', {optPath: null,role: 'Architect'});
            Architect.run(Game.creeps['Hans']);
            Game.spawns['Spawn1'].memory.builder = false;
        }


    }
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }


};