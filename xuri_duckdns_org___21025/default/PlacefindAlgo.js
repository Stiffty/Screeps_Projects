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
                        for (let yb = y - 5; yb <= y + 5; yb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        px = x + 10;
                        for (let xb = x + 1; xb <= x + 9; xb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        py = y + 5;
                        if (return1 === true) {
                            break
                        }

                    }
                    if (return1 === false) {
                        //Complete Check
                        let return2 = false;
                        for (let xb = x + 1; xb <= x + 9; xb++) {
                            for (let yb = y - 5; yb <= y + 5; yb++) {//yb <= y + 6   +1
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

                            let closest = 1000;
                            let cx;
                            let cy;
                            for (let i = 0; i < 2; i++) {
                                for (let yb = y - 5; yb <= y + 5; yb++) {//yb <= y + 6   +1
                                    Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                                    if(yb === y){
                                        if(spawn.pos.getRangeTo(px, yb)<closest){
                                            closest = spawn.pos.getRangeTo(px, yb);
                                            cx = px;
                                            cy = yb;
                                        }

                                    }
                                }
                                px = x + 10;
                                for (let xb = x + 1; xb <= x + 9; xb++) {
                                    Game.spawns['Spawn1'].room.visual.text('🟥', xb, py);
                                    if(xb === x+5){
                                        if(spawn.pos.getRangeTo(xb, py)<closest){
                                            closest = spawn.pos.getRangeTo(xb, py);
                                            cx = xb;
                                            cy = py;
                                        }
                                    }
                                }
                                py = y + 5;//+1

                            }
                            Game.spawns['Spawn1'].room.visual.text('🟥', cx, cy);

                            if(cx === x&&cy === y){
                                //links
                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx+1;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx+1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }


                            }else if(cx === x+5&&cy === y+5){
                                //oben
                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy+1;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy+1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x+5&&cy === y-5){
                                //unten

                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy-9;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy-1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x+10&&cy === y){

                                //rechts

                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx-9;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx-1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }


                            }
                            //return;
                        }
                    }

                } else if (direction === 2) {
                    let px = x;
                    let py = y - 5;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let yb = y - 5; yb <= y + 5; yb++) {

                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }


                        }
                        px = x - 10;
                        for (let xb = x - 1; xb >= x - 9; xb--) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        py = y + 5;
                        if (return1 === true) {
                            break
                        }

                    }

                    if (return1 === false) {
                        //Complete check
                        let return2 = false;
                        for (let xb = x - 1; xb >= x - 9; xb--) {
                            for (let yb = y - 5; yb <= y + 5; yb++) {
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

                            let closest = 1000;
                            let cx;
                            let cy;
                            for (let i = 0; i < 2; i++) {
                                for (let yb = y - 5; yb <= y + 5; yb++) {
                                    Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                                    if(yb === y){
                                        if(spawn.pos.getRangeTo(px, yb)<closest){
                                            closest = spawn.pos.getRangeTo(px, yb);
                                            cx = px;
                                            cy = yb;
                                        }

                                    }
                                }
                                px = x - 10;
                                for (let xb = x - 1; xb >= x - 9; xb--) {
                                    Game.spawns['Spawn1'].room.visual.text('🟩', xb, py);

                                    if(xb === x-5){
                                        if(spawn.pos.getRangeTo(xb, py)<closest){
                                            closest = spawn.pos.getRangeTo(xb, py);
                                            cx = xb;
                                            cy = py;
                                        }
                                    }
                                }
                                py = y + 5;
                            }
                            Game.spawns['Spawn1'].room.visual.text('🟥', cx, cy);

                            if(cx === x&&cy === y){
                                //rechts

                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx-9;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx-1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x-5&&cy === y-5){
                                //oben
                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy+1;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy+1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x-5&&cy === y+5){
                                //unten

                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy-9;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy-1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x-10&&cy === y){
                                //links
                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx+1;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx+1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }
                            //return;
                        }
                    }
                } else if (direction === 3) {
                    let px = x - 5;
                    let py = y;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let xb = x - 5; xb <= x + 5; xb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }

                        }
                        py = y + 10;
                        for (let yb = y + 1; yb <= y + 9; yb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        px = x + 5;
                        if (return1 === true) {
                            break
                        }
                    }

                    if (return1 === false) {
                        //Complete check
                        let return2 = false;
                        for (let xb = x - 5; xb <= x + 5; xb++) {
                            for (let yb = y + 1; yb <= y + 9; yb++) {
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
                                for (let xb = x - 5; xb <= x + 5; xb++) {

                                    Game.spawns['Spawn1'].room.visual.text('💛', xb, py);
                                    if(xb === x){
                                        if(spawn.pos.getRangeTo(xb,py)<closest){
                                            closest = spawn.pos.getRangeTo(xb,py);
                                            cx = xb;
                                            cy = py;
                                        }

                                    }

                                }
                                py = y + 10;
                                for (let yb = y + 1; yb <= y + 9; yb++) {
                                    Game.spawns['Spawn1'].room.visual.text('🟩', px, yb);
                                    if(yb === y+5){
                                        if(spawn.pos.getRangeTo(px,yb)<closest){
                                            closest = spawn.pos.getRangeTo(px,yb);
                                            cx = px;
                                            cy = yb;
                                        }
                                    }
                                }
                                px = x + 5;
                            }
                            Game.spawns['Spawn1'].room.visual.text('🟥', cx, cy);

                            if(cx === x&&cy === y){
                                //oben
                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy+1;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy+1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }


                            }else if(cx === x-10&&cy === y){
                                //unten

                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy-9;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy-1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x-5&&cy === y+5){
                                //links
                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx+1;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx+1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x+5&&cy === y+5){
                                //rechts

                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx-9;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx-1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }
                            //return;
                        }
                    }
                } else if (direction === 4) {
                    let px = x - 5;
                    let py = y;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let xb = x - 5; xb <= x + 5; xb++) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }

                        }
                        py = y - 10;
                        for (let yb = y - 1; yb >= y - 9; yb--) {
                            if (!Game.spawns['Spawn1'].room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && Game.spawns['Spawn1'].room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        px = x + 5;
                        if (return1 === true) {
                            break
                        }
                    }
                    if (return1 === false) {
                        //Complete check
                        let return2 = false;
                        for (let xb = x - 5; xb <= x + 5; xb++) {
                            for (let yb = y - 1; yb >= y - 9; yb--) {
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
                                for (let xb = x - 5; xb <= x + 5; xb++) {
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
                                py = y - 10;
                                for (let yb = y - 1; yb >= y - 9; yb--) {
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
                                px = x + 5;
                            }
                            Game.spawns['Spawn1'].room.visual.text('🟥', cx, cy);

                            //Build core

                            //DEBUG!!!!
                            // cx = 36;
                            // cy = 16;

                            if(cx === x&&cy === y){
                                //unten

                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy-9;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy-1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x&&cy === y-10){
                                //oben
                                //build rampards
                                let ox = x-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', ox+i, y);
                                }

                                let xa = cx-4;
                                let ya = cy+1;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dy === cy+1||dx === xa+1||dx===xa+4||dx===xa+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x-5&&cy === y-5){
                                //links
                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx+1;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx+1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }else if(cx === x+5&&cy === y-5){
                                //rechts

                                //build rampards
                                let oy = y-2;
                                for(let i = 0;i<5;i++){
                                    //remove constSide
                                    spawn.room.visual.text('🔵', x, oy+i);
                                }

                                let xa = cx-9;
                                let ya = cy-4;

                                for(let dx = xa;dx<=xa+8;dx++){
                                    for(let dy = ya;dy<=ya+8;dy++){
                                        if(dx === cx-1||dy === ya+1||dy===ya+4||dy===ya+7){
                                            spawn.room.visual.text('⬜', dx, dy);
                                        }else{
                                            spawn.room.visual.text('🟡', dx, dy);
                                        }
                                    }
                                }

                            }
                            //return;
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