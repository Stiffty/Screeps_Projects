var miner = require('role.Miner');
var transporter = require('role.transporter');
var spawner = require('structure.Spawner');
var upgrader = require('role.Upgrader');
var Architect = require('role.Architect');
var Builder = require('role.Builder');

module.exports.loop = function () {

    console.log(_(Game.creeps).filter({memory: {role: 'Transporter'}}).value().length);
    console.log(_(Game.creeps).filter({memory: {role: 'Upgrader'}}).value().length);
    let MinerAnzahl = 3;
    let UpgraderAnzahl = 2;

    spawner.run(MinerAnzahl,UpgraderAnzahl);


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
            Builder.run(creep);
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