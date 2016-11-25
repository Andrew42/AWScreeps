var assignTowerFillers = {

    /** @param {Creep} creep **/
    run: function(avail_rooms) {
        var active_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'tower_filler' && creep.memory.assigned_room != undefined));
        var inactive_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'tower_filler' && creep.memory.assigned_room == undefined));

        if (inactive_creeps.length == 0) {
            return;
        }

        var max_assigned = 1;
        var avail_objs = this.getAvailableObjects(active_creeps,avail_rooms,max_assigned);
        this.assignObjects(inactive_creeps,avail_objs);
    },

    // NOTE: We should just return the obj_map dictionary instead, so that we can ensure we don't over-assign inactive creeps during assignment
    getAvailableObjects: function(active_creeps,avail_rooms,max_assigned) {
        //var avail_objs = avail_rooms;
        var avail_objs = [];
        var obj_map = {};
        for (var i in avail_rooms) {
            var obj_id = avail_rooms[i].name;
            var towers = avail_rooms[i].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER
                }
            });

            // If no towers are present don't assign a filler
            if (towers.length < 1) {
                continue;
            } else {
                obj_map[obj_id] = max_assigned;
            }
            avail_objs.push(obj_id);
        }

        for (var i in active_creeps) {
            var creep = active_creeps[i];
            var obj_id = creep.memory.assigned_room;

            obj_map[obj_id] -= 1;

            if (obj_map[obj_id] <= 0) {
                var index = avail_objs.indexOf(obj_id);
                if (index > -1) {
                    avail_objs.splice(index,1);
                }
            }
        }

        return avail_objs
    },

    assignObjects: function(inactive_creeps,avail_objs) {
        for (var i in avail_objs) {
            var obj_id = avail_objs[i];
            console.log('Available container: ',obj_id);
            if (inactive_creeps.length > 0) {
                var creep = inactive_creeps[0];
                creep.memory.assigned_room = obj_id;
                inactive_creeps.splice(0,1);
                console.log('Assigned ',creep.name,' to ',obj_id);
            }
        }
    },
};

module.exports = assignTowerFillers;