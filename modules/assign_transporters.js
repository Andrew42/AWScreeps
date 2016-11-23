getStructures = require('get_structures');

var assignTransporters = {

    /** @param {Creep} creep **/
    run: function(avail_rooms) {
        var active_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'transporter' && creep.memory.assigned_container != undefined));
        var inactive_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'transporter' && creep.memory.assigned_container == undefined));

        if (inactive_creeps.length == 0) {
            return;
        }

        var max_assigned = 2;
        var avail_objs = this.getAvailableObjects(active_creeps,avail_rooms,max_assigned);
        this.assignObjects(inactive_creeps,avail_objs);
    },

    // NOTE: We should just return the obj_map dictionary instead, so that we can ensure we don't over-assign inactive creeps during assignment
    getAvailableObjects: function(active_creeps,avail_rooms,max_assigned) {
        var avail_objs = getStructures.run(avail_rooms,STRUCTURE_CONTAINER);
        var obj_map = {};
        for (var i in avail_objs) {
            var obj_id = avail_objs[i];
            if (Game.getObjectById(obj_id).room.storage != undefined) {
                obj_map[obj_id] = 1;
            } else {
                obj_map[obj_id] = max_assigned;
            }
        }

        for (var i in active_creeps) {
            var creep = active_creeps[i];
            var obj_id = creep.memory.assigned_container;

            obj_map[obj_id] -= 1;

            if (obj_map[obj_id] == 0) {
                var index = avail_objs.indexOf(obj_id);
                if (index > -1) {
                    avail_objs.splice(index,1);
                }
            }
        }
        return avail_objs
    },

    assignObjects(inactive_creeps,avail_objs) {
        for (var i in avail_objs) {
            var obj_id = avail_objs[i];
            console.log('Available container: ',obj_id);
            if (inactive_creeps.length > 0) {
                var creep = inactive_creeps[0];
                creep.memory.assigned_container = obj_id;
                inactive_creeps.splice(0,1);
                console.log('Assigned ',creep.name,' to ',obj_id);
            }
        }
    }
};

module.exports = assignTransporters;