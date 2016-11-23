//var getStructures = require('get_structures');

var assignClaimers = {

    /** @param {Creep} creep **/
    run: function(avail_rooms) {
        //var avail_sources = [];
        //var assigned_sources = [];

        var active_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'claimer' && creep.memory.assigned_room != undefined));
        var inactive_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'claimer' && creep.memory.assigned_room == undefined));

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

            //console.log('Room: ',avail_rooms[i].name);
            //console.log('Towers: ',towers.length);

            // TODO: Change this to a check for a controlled controller
            if (avail_rooms[i].controller.level > 0) {
                //obj_map[obj_id] = 0;
                continue;
            //} else if (obj_id == 'E63N33') {
            //    continue;
            } else {
                obj_map[obj_id] = max_assigned;
            }
            //console.log('Pushing: ', obj_id);
            avail_objs.push(obj_id);
        }

        console.log('obj_map: ',obj_map);
        console.log('avail_objs_1',avail_objs);

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

    assignObjects(inactive_creeps,avail_objs) {
        for (var i in avail_objs) {
            var obj_id = avail_objs[i];
            console.log('Available rooms: ',obj_id);
            if (inactive_creeps.length > 0) {
                var creep = inactive_creeps[0];
                creep.memory.assigned_room = obj_id;
                inactive_creeps.splice(0,1);
                console.log('Assigned ',creep.name,' to ',obj_id);
            }
        }
    }
};

module.exports = assignClaimers;