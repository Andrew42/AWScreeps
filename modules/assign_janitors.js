var assignJanitors = {

    /** @param {Creep} creep **/
    run: function(city) {
        var active_creeps   = _.filter(Game.creeps, (creep) => (creep.memory.role == 'janitor' && creep.memory.home == city && creep.memory.assigned_room != undefined));
        var inactive_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'janitor' && creep.memory.home == city && creep.memory.assigned_room == undefined));

        if (inactive_creeps.length == 0) {
            return;
        }

        var suburbs = Memory.city_suburbs[city];
        var max_assigned = 1;
        //var avail_rooms = this.getAvailableObjects(active_creeps,suburbs,max_assigned);
        this.assignObjects(active_creeps,inactive_creeps,city);
    },

    // NOTE: We should just return the obj_map dictionary instead, so that we can ensure we don't over-assign inactive creeps during assignment
    getAvailableObjects: function(active_creeps,avail_rooms,max_assigned) {
        //var avail_objs = avail_rooms;
        var avail_objs = [];
        var obj_map = {};
        for (var i in avail_rooms) {
            var room = Game.rooms[avail_rooms[i]];
            if (room == undefined) {
                continue;
            }
            var obj_id = avail_rooms[i];
            var towers = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER
                }
            });

            //console.log('Room: ',avail_rooms[i].name);
            //console.log('Towers: ',towers.length);

            // If there is a tower present only use 1 janitor
            if (towers.length > 0) {
                obj_map[obj_id] = 1;
                //continue;
            } else {
                obj_map[obj_id] = max_assigned;
            }
            //console.log('Pushing: ', obj_id);
            avail_objs.push(obj_id);
        }

        //console.log('obj_map: ',obj_map);
        //console.log('avail_objs_1',avail_objs);

        for (var i in active_creeps) {
            var creep = active_creeps[i];
            var obj_id = creep.memory.assigned_room;

            obj_map[obj_id] -= 1;

            //console.log('obj_id',obj_id);
            //console.log('obj_map[obj_id]',obj_map[obj_id]);

            if (obj_map[obj_id] <= 0) {
                var index = avail_objs.indexOf(obj_id);
                if (index > -1) {
                    avail_objs.splice(index,1);
                }
            }
        }

        console.log('avail_objs_2',avail_objs);

        return avail_objs
    },

    assignObjects(active_creeps,inactive_creeps,city) {
        var suburbs = Memory.city_suburbs[city];
        if (active_creeps == undefined) {
            var num_active = 0;
        } else {
            var num_active = active_creeps.length;
        }
        for (var i in inactive_creeps) {
            var creep = inactive_creeps[0];
            creep.memory.assigned_suburbs = suburbs;
            creep.memory.assigned_room = suburbs[(num_active+1) % suburbs.length];
        }


        //for (var i in avail_objs) {
        //    var obj_id = avail_objs[i];
        //    console.log('Available rooms: ',obj_id);
        //    if (inactive_creeps.length > 0) {
        //        var creep = inactive_creeps[0];
        //        creep.memory.assigned_room = obj_id;
        //        inactive_creeps.splice(0,1);
        //        console.log('Assigned ',creep.name,' to ',obj_id);
        //    }
        //}
    }
};

module.exports = assignJanitors;