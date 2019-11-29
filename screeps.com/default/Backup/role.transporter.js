/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var Transporter = {

    run: function (creep,ClientAnzahl) {

        let source = creep.room.find(FIND_DROPPED_RESOURCES);
        if (creep.pickup(source[0]) === ERR_NOT_IN_RANGE&&creep.store.getUsedCapacity() === 0) {

            creep.moveTo(source[0]), ({visualizePathStyle: {stroke: '#0010ff'}});
        } else {


            let Ucreeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');
            if (creep.memory.client === null&& Ucreeps.length === ClientAnzahl) { //Lenth muss Upgrade spanlimit sein

                for (const name in Ucreeps) {
                    let UcreepMEM = Ucreeps[name].memory.transporter;
                    if (UcreepMEM === null) {
                        Ucreeps[name].memory.transporter = creep.name;
                        creep.memory.client = Ucreeps[name].name;
                        break;
                    }
                }

            } else if (creep.memory.client) {
                let client = Game.creeps[creep.memory.client];
                if(client === undefined){
                    creep.memory.client = null;
                }else if (creep.transfer(client, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(client.pos);
                }

            }
            let base = creep.room.find(FIND_MY_SPAWNS);
            if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] <300&&creep.transfer(base[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {

                creep.moveTo(base[0]);
            }

        }
    }

};
module.exports = Transporter;