var assignClaimers = {

    /** @param {Creep} creep **/
    run: function(rooms) {
        var active_creeps   = _.filter(Game.creeps, (creep) => (creep.memory.role == 'scout' && creep.memory.assigned_room != undefined));
        var inactive_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'scout' && creep.memory.assigned_room == undefined));

        if (inactive_creeps.length == 0) {
            return;
        }

        var max_assigned = 1;
    },

    getAvailableObjects: function(active_creeps,rooms,max_assigned) {
        var avail_objs = [];    // Room names
        var obj_map = {};       // {'room_name': max_assigned_creeps}
        for (var i in rooms) {
            var obj_id = rooms[i].name;     // 'room_name'
        }
    },

    assignObjects: function() {

    }
}