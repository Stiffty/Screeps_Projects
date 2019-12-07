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


        let sour = spawn.room.find(FIND_SOURCES);
        for (const i in sour) {

            let goals = sour[i];


            let ret = PathFinder.search(
                spawn.room.controller.pos, goals,
                {
                    // We need to set the defaults costs higher so that we
                    // can set the road cost lower in `roomCallback`
                    plainCost: 2,
                    swampCost: 10,

                    roomCallback: function (roomName) {

                        let room = Game.rooms[roomName];
                        // In this example `room` will always exist, but since
                        // PathFinder supports searches which span multiple rooms
                        // you should be careful!
                        if (!room) return;
                        let costs = new PathFinder.CostMatrix;

                        room.find(FIND_STRUCTURES).forEach(function (struct) {
                            if (struct.structureType === STRUCTURE_ROAD) {
                                // Favor roads over plain tiles
                                costs.set(struct.pos.x, struct.pos.y, 1);
                            } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                                (struct.structureType !== STRUCTURE_RAMPART ||
                                    !struct.my)) {
                                // Can't walk through non-walkable buildings
                                costs.set(struct.pos.x, struct.pos.y, 0xff);
                            }
                        });

                        // Avoid spawns in the room


                        return costs;
                    },
                }
            );
            for (const number in ret.path) {
                spawn.room.createConstructionSite(ret.path[number].x, ret.path[number].y, STRUCTURE_ROAD);
            }

        }

        Spos = spawn.pos;
        Startx = Spos.x - 2;
        starty = Spos.y - 2;

        for (let x = Startx; x < (Startx + 5); x++) {
            for (let y = starty; y < (starty + 5); y++) {
                if (spawn.room.getTerrain().get(x, y) !== 1) {
                    if ((x === (Spos.x - 2) && y === (Spos.y - 2)) || (x === (Spos.x + 2) && y === (Spos.y - 2))
                        || (x === (Spos.x - 2) && y === (Spos.y + 2)) || (x === (Spos.x + 2) && y === (Spos.y + 2))) {
                        spawn.room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
                    }
                    spawn.room.createConstructionSite(x, y, STRUCTURE_ROAD);


                }
            }
        }
        let x2 = spawn.pos.x + 3;
        spawn.room.createConstructionSite(x2, spawn.pos.y, STRUCTURE_TOWER);


        // spawn.room.visual.text(c,x,y);
        let x = spawn.pos.x; //spawn
        let xcounter = 1;
        let y = spawn.pos.y; //spawn
        let ycounter = 1;
        let counter = 0;
        let switch1 = 1;
        let switch2 = 1;

        let direction = 0;


        for (let c = 0; c < 2000; c++) {//2401
            if (switch1 === 1) {
                //y
                if (switch2 === 1) {
                    //+
                    y++;
                    counter++;
                    direction = 2;
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
                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }
                        }
                        px = x + 10;
                        for (let xb = x + 1; xb <= x + 9; xb++) {
                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
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
                                if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
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
                                    spawn.room.createConstructionSite(px, yb, STRUCTURE_WALL);
                                    if (yb === y) {
                                        if (spawn.pos.getRangeTo(px, yb) < closest) {
                                            closest = spawn.pos.getRangeTo(px, yb);
                                            cx = px;
                                            cy = yb;
                                        }

                                    }
                                }
                                px = x + 10;
                                for (let xb = x + 1; xb <= x + 9; xb++) {
                                    spawn.room.createConstructionSite(xb, py, STRUCTURE_WALL);
                                    if (xb === x + 5) {
                                        if (spawn.pos.getRangeTo(xb, py) < closest) {
                                            closest = spawn.pos.getRangeTo(xb, py);
                                            cx = xb;
                                            cy = py;
                                        }
                                    }
                                }
                                py = y + 5;//+1

                            }

                            if (cx === x && cy === y) {
                                //links
                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx + 1;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx + 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }


                            } else if (cx === x + 5 && cy === y + 5) {
                                //oben
                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy + 1;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy + 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x + 5 && cy === y - 5) {
                                //unten

                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy - 9;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy - 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x + 10 && cy === y) {

                                //rechts

                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 9;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx - 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }


                            }
                            return;
                        }
                    }

                } else if (direction === 2) {
                    let px = x;
                    let py = y - 5;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let yb = y - 5; yb <= y + 5; yb++) {

                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }


                        }
                        px = x - 10;
                        for (let xb = x - 1; xb >= x - 9; xb--) {
                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
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
                                if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
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
                                for (let yb = y - 5; yb <= y + 5; yb++) {
                                    spawn.room.createConstructionSite(px, yb, STRUCTURE_WALL);
                                    if (yb === y) {
                                        if (spawn.pos.getRangeTo(px, yb) < closest) {
                                            closest = spawn.pos.getRangeTo(px, yb);
                                            cx = px;
                                            cy = yb;
                                        }

                                    }
                                }
                                px = x - 10;
                                for (let xb = x - 1; xb >= x - 9; xb--) {
                                    spawn.room.createConstructionSite(xb, py, STRUCTURE_WALL);
                                    if (xb === x - 5) {
                                        if (spawn.pos.getRangeTo(xb, py) < closest) {
                                            closest = spawn.pos.getRangeTo(xb, py);
                                            cx = xb;
                                            cy = py;
                                        }
                                    }
                                }
                                py = y + 5;
                            }

                            if (cx === x && cy === y) {
                                //rechts

                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 9;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx - 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x - 5 && cy === y - 5) {
                                //oben
                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy + 1;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy + 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            ;
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x - 5 && cy === y + 5) {
                                //unten

                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy - 9;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy - 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x - 10 && cy === y) {
                                //links
                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx + 1;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx + 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            }
                            return;
                        }
                    }
                } else if (direction === 3) {
                    let px = x - 5;
                    let py = y;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let xb = x - 5; xb <= x + 5; xb++) {
                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }

                        }
                        py = y + 10;
                        for (let yb = y + 1; yb <= y + 9; yb++) {
                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
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
                                if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
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
                            px = x - 5;
                            py = y;

                            let closest = 1000;
                            let cx;
                            let cy;

                            for (let i = 0; i < 2; i++) {
                                for (let xb = x - 5; xb <= x + 5; xb++) {
                                    spawn.room.createConstructionSite(xb, py, STRUCTURE_WALL);
                                    if (xb === x) {
                                        if (spawn.pos.getRangeTo(xb, py) < closest) {
                                            closest = spawn.pos.getRangeTo(xb, py);
                                            cx = xb;
                                            cy = py;
                                        }

                                    }

                                }
                                py = y + 10;
                                for (let yb = y + 1; yb <= y + 9; yb++) {
                                    spawn.room.createConstructionSite(px, yb, STRUCTURE_WALL);
                                    if (yb === y + 5) {
                                        if (spawn.pos.getRangeTo(px, yb) < closest) {
                                            closest = spawn.pos.getRangeTo(px, yb);
                                            cx = px;
                                            cy = yb;
                                        }
                                    }
                                }
                                px = x + 5;
                            }

                            if (cx === x && cy === y) {
                                //oben
                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy + 1;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy + 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }


                            } else if (cx === x - 10 && cy === y) {
                                //unten

                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy - 9;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy - 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x - 5 && cy === y + 5) {
                                //links
                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx + 1;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx + 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x + 5 && cy === y + 5) {
                                //rechts

                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 9;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx - 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            }
                            return;
                        }
                    }
                } else if (direction === 4) {
                    let px = x - 5;
                    let py = y;
                    let return1 = false;
                    for (let i = 0; i < 2; i++) {
                        for (let xb = x - 5; xb <= x + 5; xb++) {
                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, py)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, py)[0] !== 'wall') {
                            } else {
                                return1 = true;
                                break
                            }

                        }
                        py = y - 10;
                        for (let yb = y - 1; yb >= y - 9; yb--) {
                            if (!spawn.room.lookForAt(LOOK_STRUCTURES, px, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, px, yb)[0] !== 'wall') {
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
                                if (!spawn.room.lookForAt(LOOK_STRUCTURES, xb, yb)[0] && spawn.room.lookForAt(LOOK_TERRAIN, xb, yb)[0] !== 'wall') {
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
                            px = x - 5;
                            py = y;

                            let closest = 1000;
                            let cx;
                            let cy;
                            for (let i = 0; i < 2; i++) {
                                for (let xb = x - 5; xb <= x + 5; xb++) {
                                    //build walls
                                    spawn.room.createConstructionSite(xb, py, STRUCTURE_WALL);
                                    if (xb === x) {
                                        if (spawn.pos.getRangeTo(xb, py) < closest) {
                                            closest = spawn.pos.getRangeTo(xb, py);
                                            cx = xb;
                                            cy = py;
                                        }

                                    }

                                }
                                py = y - 10;
                                for (let yb = y - 1; yb >= y - 9; yb--) {
                                    //build walls
                                    spawn.room.createConstructionSite(px, yb, STRUCTURE_WALL);
                                    if (yb === y - 5) {
                                        if (spawn.pos.getRangeTo(px, yb) < closest) {
                                            closest = spawn.pos.getRangeTo(px, yb);
                                            cx = px;
                                            cy = yb;
                                        }
                                    }
                                }
                                px = x + 5;
                            }

                            //Build core

                            //DEBUG!!!!
                            // cx = 36;
                            // cy = 16;

                            if (cx === x && cy === y) {
                                //unten

                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy - 9;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy - 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x && cy === y - 10) {
                                //oben
                                //build rampards
                                let ox = x - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,ox + i, y)[0].remove();
                                    spawn.room.createConstructionSite(ox + i, y, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 4;
                                let ya = cy + 1;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dy === cy + 1 || dx === xa + 1 || dx === xa + 4 || dx === xa + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x - 5 && cy === y - 5) {
                                //links
                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx + 1;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx + 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }

                            } else if (cx === x + 5 && cy === y - 5) {
                                //rechts

                                //build rampards
                                let oy = y - 2;
                                for (let i = 0; i < 5; i++) {
                                    //remove constSide
                                    spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES,x, oy + i)[0].remove();
                                    spawn.room.createConstructionSite(x, oy + i, STRUCTURE_RAMPART);
                                }

                                let xa = cx - 9;
                                let ya = cy - 4;

                                for (let dx = xa; dx <= xa + 8; dx++) {
                                    for (let dy = ya; dy <= ya + 8; dy++) {
                                        if (dx === cx - 1 || dy === ya + 1 || dy === ya + 4 || dy === ya + 7) {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_ROAD);
                                        } else {
                                            spawn.room.createConstructionSite(dx, dy, STRUCTURE_EXTENSION);
                                        }
                                    }
                                }
                            }
                            return;
                        }
                    }
                }
            }
        }
    }
};


module.exports = Architect;