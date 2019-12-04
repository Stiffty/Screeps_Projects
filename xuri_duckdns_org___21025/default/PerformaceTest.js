/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('PerformaceTest');
 * mod.thing == 'a thing'; // true
 */

let test = {

    run: function () {
        let time = Game.cpu.getUsed();
        //First

        //let creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'Upgrader');

        // let cx = creep.pos.x;
        // let cy = creep.pos.y;
        //
        // let sx = Game.getObjectById(source).pos.x;
        // let sy = Game.getObjectById(source).pos.y;

        let x = 25; //spawn
        let xcounter = 1;
        let y = 32; //spawn
        let ycounter = 1;
        let counter = 0;
        let switch1 = 1;
        let switch2 = 1;

        let direction = 0;
        console.log(Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,30, 40));


        for (let c = 0; c < 200; c++) {//2401
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
            if (direction === 10) {
                let px = x;
                let py = y - 5;
                let return1 = false
                for (let i = 0; i < 2; i++) {
                    for (let yb = y - 5; yb <= y + 5; yb++) {
                        if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,px, yb)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,px, yb)[0] !== 'wall') {
                        }else{
                            return1 = true;
                            break
                        }
                    }
                    px = x + 11;
                    for (let xb = x + 1; xb <= x + 10; xb++) {
                        if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,xb, py)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,xb, py)[0] !== 'wall') {
                        }else{
                            return1 = true;
                            break
                        }
                    }
                    py = y + 5;
                    if(return1 === true){
                        break
                    }for (let yb = y - 5; yb <= y + 5; yb++) {
                        if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,px, yb)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,px, yb)[0] !== 'wall') {
                        }else{
                            return1 = true;
                            break
                        }
                    }
                    px = x + 11;
                    for (let xb = x + 1; xb <= x + 10; xb++) {
                        if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,xb, py)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,xb, py)[0] !== 'wall') {
                        }else{
                            return1 = true;
                            break
                        }
                    }
                    py = y + 5;
                    if(return1 === true){
                        break
                    }

                    for (let yb = y - 5; yb <= y + 5; yb++) {
                        Game.spawns['Spawn1'].room.visual.text('O', px, yb);
                    }
                    px = x + 11;
                    for (let xb = x + 1; xb <= x + 10; xb++) {
                        Game.spawns['Spawn1'].room.visual.text('T', xb, py);
                    }
                    py = y + 5;
                }
                if(return1 === false){
                    //Complete Check
                    px = x;
                    py = y - 5;
                    for (let i = 0; i < 2; i++) {
                        for (let yb = y - 5; yb <= y + 5; yb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,px, yb)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,px, yb)[0] !== 'wall') {
                            }else{
                                return1 = true;
                                break
                            }
                        }
                        px = x + 11;
                        for (let xb = x + 1; xb <= x + 10; xb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,xb, py)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,xb, py)[0] !== 'wall') {
                            }else{
                                return1 = true;
                                break
                            }
                        }
                        py = y + 5;
                        if(return1 === true){
                            break
                        }
                    }
                }
            } else if (direction === 2) {
                let px = x;
                let py = y - 5;
                let return1 = false;
                for (let i = 0; i < 2; i++) {
                    for (let yb = y - 5; yb <= y + 5; yb++) {

                        if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,px, yb)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,px, yb)[0] !== 'wall') {
                        }else{
                            return1 = true;
                            break
                        }


                    }
                    px = x - 11;
                    for (let xb = x - 1; xb >= x - 10; xb--) {
                        if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,xb, py)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,xb, py)[0] !== 'wall') {
                        }else{
                            return1 = true;
                            break
                        }
                    }
                    py = y + 5;
                    if(return1 === true){
                        break
                    }

                }

                if(return1 === false){
                    px = x;
                    py = y - 5;
                    for (let i = 0; i < 2; i++) {
                        for (let yb = y - 5; yb <= y + 5; yb++) {

                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,px, yb)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,px, yb)[0] !== 'wall') {
                                Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                            }


                        }
                        px = x - 11;
                        for (let xb = x - 1; xb >= x - 10; xb--) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES,xb, py)[0]&&Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN,xb, py)[0] !== 'wall') {
                                Game.spawns['Spawn1'].room.visual.text('🟩', xb, py);
                            }
                        }
                        py = y + 5;
                    }
                }
            }else if(direction === 30){
                let px = x - 5;
                let py = y;
                for (let i = 0; i < 2; i++) {
                    for (let xb = x - 5; xb <= x + 5; xb++) {
                        Game.spawns['Spawn1'].room.visual.text('O', xb, py);

                    }
                    py = y + 11;
                    for (let yb = y + 1; yb <= y + 10; yb++) {
                        Game.spawns['Spawn1'].room.visual.text('T', px, yb);
                    }
                    px = x + 5;
                }
            }else if(direction === 40){
                let px = x - 5;
                let py = y;
                for (let i = 0; i < 2; i++) {
                    for (let xb = x - 5; xb <= x + 5; xb++) {
                        Game.spawns['Spawn1'].room.visual.text('O', xb, py);

                    }
                    py = y - 11;
                    for (let yb = y - 1; yb >= y - 10; yb--) {
                        Game.spawns['Spawn1'].room.visual.text('T', px, yb);
                    }
                    px = x + 5;
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