/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Architect');
 * mod.thing == 'a thing'; // true
 */
let Architect = {

    run: function (spawn) {


        let px = 1;
        let py = 1;
        let closest = 1000;
        let cx  = -1;
        let cy = -1 ;

        let line = false;

        for (let i = 0; i < 2; i++) {
            closest = 1000;
            for (let yb = 0; yb <48; yb++) {
                if (spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall'&&px === 1) {
                    spawn.room.createConstructionSite(px, yb+2,STRUCTURE_WALL);
                    if(line === false){
                        spawn.room.createConstructionSite(px, yb+1,STRUCTURE_WALL);
                    }
                    line =true;
                }else  if (spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall'&&px === 48) {
                    spawn.room.createConstructionSite(px, yb-2,STRUCTURE_WALL);
                    if(line === false){
                        spawn.room.createConstructionSite(px, yb-1,STRUCTURE_WALL);
                    }
                    line =true;
                }else if (px === 1){
                    if(line === true){
                        spawn.room.createConstructionSite(px, yb+1,STRUCTURE_WALL);
                    }
                    line =false;
                }else{
                    if(line === true){
                        spawn.room.createConstructionSite(px, yb-1,STRUCTURE_WALL);
                    }
                    line =false;
                }
                if(line === true&&px === 1){
                    if(spawn.pos.getRangeTo(px, yb+2)<closest){
                        //spawn.room.createConstructionSite(px, yb+1,STRUCTURE_WALL);
                        closest = spawn.pos.getRangeTo(px, yb+2);
                        cx = px;
                        cy = yb+2;
                    }
                }else if(line === true&&px === 48){
                    if(spawn.pos.getRangeTo(px, yb-2)<closest){
                        //spawn.room.createConstructionSite(px, yb-1,STRUCTURE_WALL);
                        closest = spawn.pos.getRangeTo(px, yb-2);
                        cx = px;
                        cy = yb-2;
                    }
                }else if(cx !== -1){
                    let path = spawn.pos.findPathTo(cx,cy,{ignoreCreeps:true});
                    for(let i = 0;i<path.length;i++){
                        spawn.room.createConstructionSite(path[i].x,path[i].y,STRUCTURE_ROAD);
                    }
                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,cx,cy)[0].remove();
                    spawn.room.createConstructionSite(cx,cy, STRUCTURE_RAMPART);
                    closest = 1000;
                    cx = -1;

                }

            }
            px = 48;
            for (let xb = 0; xb <48; xb++) {
                if (spawn.room.lookForAt(LOOK_TERRAIN, xb,py)[0] !== 'wall'&&py === 1) {
                    spawn.room.createConstructionSite(xb,py+2,STRUCTURE_WALL);
                    if(line === false){
                        spawn.room.createConstructionSite(xb,py+1,STRUCTURE_WALL);
                    }
                    line =true;
                }else  if (spawn.room.lookForAt(LOOK_TERRAIN, xb,py)[0] !== 'wall'&&py === 48) {
                    spawn.room.createConstructionSite(xb,py-2,STRUCTURE_WALL);
                    if(line === false){
                        spawn.room.createConstructionSite(xb,py-1,STRUCTURE_WALL);
                    }
                    line =true;
                }else if (py === 1) {
                    if(line === true){
                        spawn.room.createConstructionSite(xb,py+1,STRUCTURE_WALL);
                    }
                    line = false;
                }else{
                    if(line === true){
                        spawn.room.createConstructionSite(xb,py-1,STRUCTURE_WALL);
                    }
                    line = false;
                }
                if(line === true&&py === 1){
                    if(spawn.pos.getRangeTo(xb,py+2)<closest){
                        closest = spawn.pos.getRangeTo(xb,py+2);
                        cx = xb;
                        cy = py+2;
                    }

                }else if(line === true&&py === 48){
                    if(spawn.pos.getRangeTo(xb,py-2)<closest){
                        closest = spawn.pos.getRangeTo(xb,py-2);
                        cx = xb;
                        cy = py-2;
                    }
                } else if(cx !== -1){
                    let path = spawn.pos.findPathTo(cx,cy,{ignoreCreeps:true});
                    for(let i = 0;i<path.length;i++){
                        spawn.room.createConstructionSite(path[i].x,path[i].y,STRUCTURE_ROAD);
                    }
                    let con = spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,cx,cy)[0];
                    if (con !== undefined) {
                        con.remove();
                    }
                    spawn.room.createConstructionSite(cx,cy, STRUCTURE_RAMPART);
                    closest = 1000;
                    cx = -1;
                }
            }
            py = 48;
        }
    }

};


module.exports = Architect;