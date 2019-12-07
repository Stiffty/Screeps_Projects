/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.Tower');
 * mod.thing == 'a thing'; // true
 */
let tower ={
    run: function (spawn) {
        let creepslife = spawn.room.find(FIND_CREEPS,{filter: (creep) => creep.hits < creep.hitsMax});
        let tower = spawn.room.find(FIND_STRUCTURES,{filter: {structureType: STRUCTURE_TOWER}});
        if(spawn.memory.atk === undefined ){
            spawn.memory.atk = null;
        }

        if(spawn.room.find(FIND_HOSTILE_CREEPS).length>0||spawn.memory.atk !== null){
            let enemy = spawn.room.find(FIND_HOSTILE_CREEPS);
            if(spawn.memory.atk === null||spawn.memory.atk === undefined){
                spawn.memory.atk = enemy[0].id;

            }else if(Game.getObjectById(spawn.memory.atk) === null){
                spawn.memory.atk = null;
            }else{
                for(const name in tower){
                    tower[name].attack(Game.getObjectById(spawn.memory.atk));
                }
            }

        }else if(creepslife.length > 0){
            for(const name in tower){
                tower[name].heal(creepslife[0]);
            }
        }else if(spawn.room.find(FIND_STRUCTURES,{filter: (creep) => creep.hits < creep.hitsMax&&creep.structureType === STRUCTURE_RAMPART&&creep.hits<10000}).length>0){
            let rampart = spawn.room.find(FIND_STRUCTURES,{filter: (creep) => creep.hits < creep.hitsMax&&creep.structureType === STRUCTURE_RAMPART&&creep.hits<10000});
            for(const name in tower){
                tower[name].repair(rampart[0]);
            }

        }else if(spawn.room.find(FIND_STRUCTURES,{filter: (creep) => creep.hits < creep.hitsMax&&creep.hits<10000}).length>0){
            let structure = spawn.room.find(FIND_STRUCTURES,{filter: (creep) => creep.hits < creep.hitsMax&&creep.hits<10000});
            for(const name in tower){
                tower[name].repair(structure[0]);
            }
        }


    }
};


module.exports = tower;