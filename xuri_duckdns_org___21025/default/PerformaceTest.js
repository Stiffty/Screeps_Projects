/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('PerformaceTest');
 * mod.thing == 'a thing'; // true
 */

let test = {

    run: function (spawn) {
        let time = Game.cpu.getUsed();
        //First
        let px = 0;
        let py = 0;
        let closest = 1000;
        let cx  = 0-1
        let cy = -1 ;

        let line = false;

        for (let i = 0; i < 2; i++) {
            closest = 1000;
            for (let yb = 0; yb <49; yb++) {
                if (spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall'&&px === 0) {
                    spawn.room.visual.text('🟥',px, yb+1);
                    line =true;
                }else  if (spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall'&&px === 49) {
                    spawn.room.visual.text('🟥',px, yb-1);
                    line =true;
                }else{
                    line =false;
                }
                if(line === true&&px === 0){
                    if(spawn.pos.findPathTo(px, yb+1,{ignoreCreeps:true}).length<closest){
                        closest = spawn.pos.getRangeTo(px, yb+1);
                        cx = px;
                        cy = yb+1;
                    }
                }else if(line === true&&px === 49){
                    if(spawn.pos.findPathTo(px, yb-1,{ignoreCreeps:true}).length<closest){
                        closest = spawn.pos.getRangeTo(px, yb-1);
                        cx = px;
                        cy = yb-1;
                    }
                }else if(cx !== -1){
                    let path = spawn.pos.findPathTo(cx,cy,{ignoreCreeps:true});
                    for(let i = 0;i<path.length;i++){
                        spawn.room.visual.text('⬛',path[i].x,path[i].y);
                    }
                    spawn.room.visual.text('🟩',cx,cy);
                    closest = 1000;
                    cx = -1;
                }

            }
            px = 49;
            for (let xb = 0; xb <49; xb++) {
                if (spawn.room.lookForAt(LOOK_TERRAIN, xb,py)[0] !== 'wall'&&py === 0) {
                    spawn.room.visual.text('🟥',xb,py+1);
                    line =true;
                }else  if (spawn.room.lookForAt(LOOK_TERRAIN, xb,py)[0] !== 'wall'&&py === 49) {
                    spawn.room.visual.text('🟥',xb,py-1);
                    line =true;
                }else{
                    line = false;
                }
                if(line === true&&py === 0){
                    if(spawn.pos.findPathTo(xb,py+1,{ignoreCreeps:true}).length<closest){
                        closest = spawn.pos.getRangeTo(xb,py+1);
                        cx = xb;
                        cy = py+1;
                    }

                }else if(line === true&&py === 49){
                    if(spawn.pos.findPathTo(xb,py-1,{ignoreCreeps:true}).length<closest){
                        closest = spawn.pos.getRangeTo(xb,py-1);
                        cx = xb;
                        cy = py-1;
                    }
                } else if(cx !== -1){
                    let path = spawn.pos.findPathTo(cx,cy,{ignoreCreeps:true});
                    console.log('testt');
                    for(let i = 0;i<path.length;i++){
                        spawn.room.visual.text('⬛',path[i].x,path[i].y);
                    }
                    spawn.room.visual.text('🟩',cx,cy);
                    closest = 1000;
                    cx = -1;
                }
            }
            py = 49;
        }

//End
        console.log(Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, 32, 29) + '  First: ' + (Game.cpu.getUsed() - time));
        time = Game.cpu.getUsed();

//Versus


// let count = 0;
// let creeps1 = Game.creeps;
// for(const i in creeps1){
//     if(creeps1[i].memory.role === 'Upgrader'){
//         count++;
//     }
// }
//End
        console.log(' Second: ' + (Game.cpu.getUsed() - time));

    }
};

module.exports = test;