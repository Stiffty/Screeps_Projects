/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var Transporter = {

    run: function (creep) {

        if (creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_DROPPED_RESOURCES);
            creep.say(' Suche...');
            if (creep.pickup(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#0010ff'}});
                creep.say(' Mine...');
            }
        } else {
            let base = creep.room.find(FIND_MY_SPAWNS);

            let Ucreeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');
            if (creep.memory.client === null&& Ucreeps.length == 3) {
                for (const name in Ucreeps) {

                    let UcreepMEM = Ucreeps[name].memory.transporter;

                    if (UcreepMEM === null && creep.memory.client == null) {
                        console.log(creep.name + ' Find ' + Ucreeps.name);
                        Ucreeps[name].memory.transporter = creep.name;
                        creep.memory.client = Ucreeps[name].name;
                        console.log(UcreepMEM);
                        break;
                    }
                }
                
            } else if (creep.memory.client !== null) {

                if (creep.transfer(Game.creeps[creep.memory.client], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    //Game.creeps[creep.memory.client].store.getFreeCapacity(RESOURCE_ENERGY)>0&&
                    creep.moveTo(Game.creeps[creep.memory.client].pos);
                }

            }
            if (creep.transfer(base[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE&&Game.spawns['Spawn1'].store[RESOURCE_ENERGY] <200) {
                creep.moveTo(base[0]);
            }
        }
    }

};
module.exports = Transporter;