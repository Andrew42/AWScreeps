var assignTransporters = {

    /** @param {Creep} creep **/
    run: function(city) {
        var active_creeps   = _.filter(Game.creeps, (creep) => (creep.memory.role == 'transporter' && creep.memory.home == city && creep.memory.assigned_container != undefined));
        var inactive_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'transporter' && creep.memory.home == city && creep.memory.assigned_container == undefined));

        if (inactive_creeps.length == 0 || inactive_creeps.length == undefined) {
            return;
        }

        var suburbs = Memory.city_suburbs[city];
        var max_assigned = 2;
        var avail_rooms = this.getAvailableObjects(active_creeps,suburbs,max_assigned);
        this.assignObjects(inactive_creeps,avail_rooms);
    },

    // NOTE: We should just return the obj_map dictionary instead, so that we can ensure we don't over-assign inactive creeps during assignment
    getAvailableObjects: function(active_creeps,avail_rooms,max_assigned) {
        var avail_objs = this.getStructures(avail_rooms,STRUCTURE_CONTAINER);

        var avail_link_ids = this.getStructures(avail_rooms,STRUCTURE_LINK);
        var avail_link_objs = [];
        for (var i in avail_link_ids) {
            avail_link_objs.push(Game.getObjectById(avail_link_ids[i]));
        }

        //console.log('Avail. objs1:',avail_objs);

        var obj_map = {};
        var tmp_lst = [];
        for (var i in avail_objs) {
            var obj_id = avail_objs[i];
            //console.log('obj_id: ',obj_id);
            //console.log('avail_link_ids: ',avail_link_ids);
            if (Game.getObjectById(obj_id).room.storage != undefined) {
                //console.log(obj_id,': Has storage in room');
                var targets = Game.getObjectById(obj_id).pos.findInRange(avail_link_objs,1);
                //console.log('targets_in_range: ',targets.length);
                if (Game.getObjectById(obj_id).pos.findInRange(avail_link_objs,1).length > 0) {
                    //console.log(obj_id,': Has',Game.getObjectById(obj_id).pos.findInRange(avail_link_objs,1).length,'Link(s) in range');
                    //obj_map[obj_id] = 0;
                    continue;
                } else {
                    //console.log(obj_id,': No link in range');
                    obj_map[obj_id] = 1;
                }
            } else {
                obj_map[obj_id] = max_assigned;
            }
            tmp_lst.push(obj_id);
        }
        //console.log('tmp_lst:',tmp_lst);

        avail_objs = tmp_lst;

        for (var i in active_creeps) {
            var creep = active_creeps[i];
            var obj_id = creep.memory.assigned_container;

            //console.log(creep.name,':');
            //console.log(obj_id,': ',obj_map[obj_id]);

            obj_map[obj_id] -= 1;

            if (obj_map[obj_id] <= 0) {
                var index = avail_objs.indexOf(obj_id);
                if (index > -1) {
                    avail_objs.splice(index,1);
                }
            }
        }

        //console.log('Avail. objs2:',avail_objs);
        return avail_objs
    },

    assignObjects: function(inactive_creeps,avail_objs) {
        for (var i in avail_objs) {
            var obj_id = avail_objs[i];
            console.log('Available container: ',obj_id);
            if (inactive_creeps.length > 0) {
                var creep = inactive_creeps[0];
                console.log('Assigned ',creep.name,' to ',obj_id);
                creep.memory.assigned_container = obj_id;
                //this.assignPath(creep);
                inactive_creeps.splice(0,1);
            }
        }
    },

    assignPath: function(creep) {
        var origin = Game.getObjectById(creep.memory.assigned_storage);
        var goal = Game.getObjectById(creep.memory.assigned_container);
        console.log('Calculating path...');
        console.log('Origin:',origin.id);
        console.log('Goal:',goal.id);
        creep.memory.assigned_path = this.getPath(creep,origin.pos,{pos: goal.pos, range: 1});
    },

    getStructures: function(rooms,structure_constant) {
        var structs = [];
        for (var i in rooms) {
            var room = Game.rooms[rooms[i]];
            var room_structs = room.find(FIND_STRUCTURES);
            for (var j in room_structs) {
                var struct = room_structs[j];
                if (struct.structureType == structure_constant) {
                    //console.log('Structure ID: ',struct.id);
                    structs.push(struct.id);
                } else {
                    //console.log('Other: ',struct.structureType);
                }
            }
        }
        //console.log('Structs:',structs);
        return structs;
    },


    getPath: function(creep,origin,goal) {
        let ret = PathFinder.search(
            origin, goal,
            {
                // We need to set the defaults costs higher so that we
                // can set the road cost lower in `roomCallback`
                plainCost: 2,
                swampCost: 10,
                
                roomCallback: function(roomName) {
                    console.log('Starting roomCallback...');
                    console.log('roomName:',roomName);
                    let room = Game.rooms[roomName];
                    // In this example `room` will always exist, but since PathFinder 
                    // supports searches which span multiple rooms you should be careful!
                    if (!room) return;

                    console.log('Generating CostMatrix...');
                    let costs = new PathFinder.CostMatrix;

                    console.log('Finding room structures...');
                    room.find(FIND_STRUCTURES).forEach(function(structure) {
                        if (structure.structureType === STRUCTURE_ROAD) {
                            // Favor roads over plain tiles
                            costs.set(structure.pos.x, structure.pos.y, 1);
                        } else if (structure.structureType !== STRUCTURE_CONTAINER && 
                                             (structure.structureType !== STRUCTURE_RAMPART ||
                                                !structure.my)) {
                            // Can't walk through non-walkable buildings
                            costs.set(structure.pos.x, structure.pos.y, 0xff);
                        }
                    });

                    console.log('Not avoiding creeps...');
                    // Avoid creeps in the room
                    room.find(FIND_CREEPS).forEach(function(creep) {
                        costs.set(creep.pos.x, creep.pos.y, 0);
                    });
                    console.log('Returning costs...');
                    return costs;
                },
            }
        );
        
        return ret.path;
    }
};

module.exports = assignTransporters;