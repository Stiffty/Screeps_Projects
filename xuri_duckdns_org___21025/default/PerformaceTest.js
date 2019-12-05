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

        //let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');

        // let cx = creep.pos.x;
        // let cy = creep.pos.y;
        //
        // let sx = Game.getObjectById(source).pos.x;
        // let sy = Game.getObjectById(source).pos.y;

        let x = spawn.pos.x; //spawn
        let xcounter = 1;
        let y = spawn.pos.y; //spawn
        let ycounter = 1;
        let counter = 0;
        let switch1 = 1;
        let switch2 = 1;

        let direction = 0;
        console.log(Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,30, 40));


        for (let c = 0; c < 2000; c++) {//2401
            if (switch1 === 1) {
                //y
                if (switch2 === 1) {
                    //+
                    y++;
                    counter++;
                    direction = 2;
                    Game.spawns['Spawn1'].room.visual.text('y+', x, y);
                    if (counter === ycounter) {
                        ycounter++;
                        counter = 0;
                        switch1 = 2;
                        direction = 0;
                    }
                } else {
                    y--;
                    counter++;
                    direction = 1;
                    Game.spawns['Spawn1'].room.visual.text('y-', x, y);
                    if (counter === ycounter) {
                        ycounter++;
                        counter = 0;
                        switch1 = 2;
                        direction = 0;
                    }
                }

            } else {
                //x
                if (switch2 === 1) {
                    //+
                    x++;
                    counter++;
                    direction = 3;
                    Game.spawns['Spawn1'].room.visual.text('x+', x, y);
                    if (counter === xcounter) {
                        xcounter++;
                        counter = 0;
                        switch1 = 1;
                        switch2 = 2;
                        direction = 0;
                    }
                } else {
                    x--;
                    counter++;
                    direction = 4;
                    Game.spawns['Spawn1'].room.visual.text('x-', x, y);
                    if (counter === xcounter) {
                        xcounter++;
                        counter = 0;
                        switch1 = 1;
                        switch2 = 1;
                        direction = 0;
                    }
                }

            }
            if (x + 11 < 49 && x - 11 > 0 && y + 11 < 49 && y - 11 > 0) {
                if (direction === 1) {
                    //y-
                    let px = x;
                    let py = y - 5;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let yb = y - 5; yb <= y + 6; yb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        px = x + 11;
                        for (let xb = x + 1; xb <= x + 10; xb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        py = y + 6;
                        if (return1 === true) {
                            break
                        }

                    }
                    if (return1 === false) {
                        //Complete Check
                        let return2 = false;
                        for (let xb = x + 1; xb <= x + 10; xb++) {
                            for (let yb = y - 5; yb <= y + 6; yb++) {//yb <= y + 6   +1
                                if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
                                } else {
                                    return2 = true;
                                    break
                                }
                            }
                            if (return2 === true) {
                                break
                            }
                        }
                        if (return2 === false) {
                            //build
                            px = x;
                            py = y - 5;
                            for (let i = 0; i < 2; i++) {
                                for (let yb = y - 5; yb <= y + 6; yb++) {//yb <= y + 6   +1
                                    Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                                }
                                px = x + 11;
                                for (let xb = x + 1; xb <= x + 10; xb++) {
                                    Game.spawns['Spawn1'].room.visual.text('🟥', xb, py);
                                }
                                py = y + 6;//+1

                            }
                            return;
                        }
                    }

                } else if (direction === 2) {
                    let px = x;
                    let py = y - 5;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let yb = y - 5; yb <= y + 6; yb++) {

                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }


                        }
                        px = x - 11;
                        for (let xb = x - 1; xb >= x - 10; xb--) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        py = y + 6;
                        if (return1 === true) {
                            break
                        }

                    }

                    if (return1 === false) {
                        //Complete check
                        let return2 = false;
                        for (let xb = x - 1; xb >= x - 10; xb--) {
                            for (let yb = y - 5; yb <= y + 6; yb++) {
                                if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
                                } else {
                                    return2 = true;
                                    break
                                }
                            }
                            if(return2 === true){
                                break
                            }
                        }
                        if(return2 === false){
                            //build
                            px = x;
                            py = y - 5;
                            for (let i = 0; i < 2; i++) {
                                for (let yb = y - 5; yb <= y + 6; yb++) {
                                    Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                                }
                                px = x - 11;
                                for (let xb = x - 1; xb >= x - 10; xb--) {
                                    Game.spawns['Spawn1'].room.visual.text('🟩', xb, py);
                                }
                                py = y + 6;
                            }
                            return;
                        }
                    }
                } else if (direction === 3) {
                    let px = x - 5;
                    let py = y;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let xb = x - 5; xb <= x + 6; xb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }

                        }
                        py = y + 11;
                        for (let yb = y + 1; yb <= y + 10; yb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        px = x + 6;
                        if (return1 === true) {
                            break
                        }
                    }

                    if (return1 === false) {
                        //Complete check
                        let return2 = false;
                        for (let xb = x - 5; xb <= x + 6; xb++) {
                            for (let yb = y + 1; yb <= y + 10; yb++) {
                                if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
                                } else {
                                    return2 = true;
                                    break
                                }
                            }
                            if (return2 === true) {
                                break
                            }
                        }
                        if(return2 === false){
                            //build
                            px = x - 5;
                            py = y;

                            for (let i = 0; i < 2; i++) {
                                for (let xb = x - 5; xb <= x + 6; xb++) {

                                    Game.spawns['Spawn1'].room.visual.text('💛', xb, py);

                                }
                                py = y + 11;
                                for (let yb = y + 1; yb <= y + 10; yb++) {
                                    Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                                }
                                px = x + 6;
                            }
                            return;
                        }
                    }
                } else if (direction === 4) {
                    let px = x - 5;
                    let py = y;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let xb = x - 5; xb <= x + 6; xb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }

                        }
                        py = y - 11;
                        for (let yb = y - 1; yb >= y - 10; yb--) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        px = x + 6;
                        if (return1 === true) {
                            break
                        }
                    }
                    if (return1 === false) {
                        //Complete check
                        let return2 = false;
                        for (let xb = x - 5; xb <= x + 6; xb++) {
                            for (let yb = y - 1; yb >= y - 10; yb--) {
                                if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
                                } else {
                                    return2 = true;
                                    break
                                }
                            }
                            if (return2 === true) {
                                break
                            }
                        }
                        if(return2 === false){
                            //build
                            px = x - 5;
                            py = y;

                            let closest = 1000;
                            let cx;
                            let cy;
                            for (let i = 0; i < 2; i++) {
                                for (let xb = x - 5; xb <= x + 6; xb++) {
                                    //build walls
                                    Game.spawns['Spawn1'].room.visual.text('🟩', xb, py);
                                    if(xb === x){
                                        if(spawn.pos.getRangeTo(xb,py)<closest){
                                            closest = spawn.pos.getRangeTo(xb,py);
                                            cx = xb;
                                            cy = py;
                                        }

                                    }

                                }
                                py = y - 11;
                                for (let yb = y - 1; yb >= y - 10; yb--) {
                                    //build walls
                                    Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                                    if(yb === y-5){
                                        if(spawn.pos.getRangeTo(px,yb)<closest){
                                            closest = spawn.pos.getRangeTo(px,yb);
                                            cx = px;
                                            cy = yb;
                                        }
                                    }
                                }
                                px = x + 6;
                            }
                            Game.spawns['Spawn1'].room.visual.text('🟥', cx, cy);
                            return;
                        }
                    }
                }
            }
        }

        //Game.spawns['Spawn1'].room.visual.text(c,x,y);

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