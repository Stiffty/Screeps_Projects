var miner = require('role.Miner');
var transporter = require('role.transporter');
var spawner = require('structure.Spawner');
var upgrader = require('role.Upgrader');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawner.run();

    for (const name in Game.creeps) {

        var creep = Game.creeps[name];

        if (creep.memory.role === 'Miner') {
            miner.run(creep);
        }
        if (creep.memory.role === 'Transporter') {
            transporter.run(creep);
        }
        if (creep.memory.role === 'Upgrader') {
            upgrader.run(creep);
        }
    }
};