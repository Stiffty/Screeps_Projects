/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('action.renew');
 * mod.thing == 'a thing'; // true
 */

let renew = {
    run: function (creep,spawn) {
        let re = spawn.renewCreep(creep);
        if(re === ERR_NOT_IN_RANGE){
            creep.moveTo(spawn);
        }else if(re === ERR_FULL){
             delete creep.memory.renew;
        }
    }
}

module.exports = renew;