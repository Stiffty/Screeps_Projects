var miner = require('role.Miner');
var transporter = require('role.transporter');
var spawner = require('structure.Spawner');
var upgrader = require('role.Upgrader');

module.exports.loop = function () {

    console.log('LUL');
    let MinerAnzahl = 3;
    let UpgraderAnzahl = 6;

    spawner.run(MinerAnzahl,UpgraderAnzahl);

    for (const name in Game.creeps) {

        var creep = Game.creeps[name];

        if (creep.memory.role === 'Miner') {
            miner.run(creep);
        }
        if (creep.memory.role === 'Transporter') {
            transporter.run(creep,UpgraderAnzahl);
        }
        if (creep.memory.role === 'Upgrader') {
            upgrader.run(creep);
        }

        for (var i in Memory.creeps) {
            if (!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }


};