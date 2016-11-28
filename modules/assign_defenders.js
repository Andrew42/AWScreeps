var assignDefenders = {
    run: function(room_names) {
        var active_creeps   = _.filter(Game.creeps, (creep) => (creep.memory.role == 'defender' && creep.memory.assigned_room != undefined));
        var inactive_creeps = _.filter(Game.creeps, (creep) => (creep.memory.role == 'defender' && creep.memory.assigned_room == undefined));

        if (inactive_creeps.length == 0 || inactive_creeps.length == undefined) {
            return;
        }

        avail_rooms = []
        for (var i in room_names) {
            var room_name = room_names[i];
            if (Game.rooms[room_name].controller.level > 4) {
                continue;
            }
            avail_rooms.push(room_name);
        }

        for (var i in active_creeps) {
            var creep = active_creeps[i];
            var creeps_room = creep.memory.assigned_room;
            var index = avail_rooms.indexOf(creeps_room);
            if (index > -1) {
                avail_rooms.splice(index,1);
            }
        }

        for (var i in avail_rooms) {
            if (inactive_creeps.length > 0) {
                var creep = inactive_creeps[0];
                creep.memory.assigned_room = avail_rooms[i];
                inactive_creeps.splice(0,1);
            }
        }
    }
};

module.exports = assignDefenders;