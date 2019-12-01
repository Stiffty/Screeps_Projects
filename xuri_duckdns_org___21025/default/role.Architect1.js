/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Architect');
 * mod.thing == 'a thing'; // true
 */
let Architect = {
    
    run: function(creep){



            let sour = creep.room.find(FIND_SOURCES);
            for (const i in sour) {

                let goals = sour[i];


                let ret = PathFinder.search(
                    creep.room.controller.pos, goals,
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

                            // Avoid creeps in the room


                            return costs;
                        },
                    }
                );
                console.log(ret.path);
                for (const number in ret.path) {
                    creep.room.createConstructionSite(ret.path[number].x, ret.path[number].y, STRUCTURE_ROAD);
                }

            }

            Spos = Game.spawns['Spawn1'].pos;
            Startx = Spos.x-2;
            starty = Spos.y-2;

            for(let x = Startx;x<(Startx+5);x++){
                for (let y = starty;y<(starty+5);y++){
                    if(creep.room.getTerrain().get(x,y) !== 1) {
                        if ((x === (Spos.x - 2) && y === (Spos.y - 2)) || (x === (Spos.x + 2) && y === (Spos.y - 2))
                            || (x === (Spos.x - 2) && y === (Spos.y + 2)) || (x === (Spos.x + 2) && y === (Spos.y + 2))) {
                            creep.room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
                        }
                        creep.room.createConstructionSite(x, y, STRUCTURE_ROAD);


                    }
                }
            }
        creep.suicide();
        }
};



module.exports =Architect;