var getStructures = require('get_structures');

var assignJanitors = {

    /** @param {Creep} creep **/
    run: function(avail_rooms) {
        //var avail_sources = [];
        //var assigned_sources = [];

        var active_janitors = _.filter(Game.creeps, (creep) => (creep.memory.role == 'janitor' && creep.memory.home != undefined));
        var inactive_janitors = _.filter(Game.creeps, (creep) => (creep.memory.role == 'janitor' && creep.memory.home == undefined));

        // Ignore rooms with a tower in them
        var tmp_lst = [];
        for (var i in avail_rooms) {
            var room = avail_rooms[i];
            var towers = getStructures.run([room],STRUCTURE_TOWER);
            if (towers.length == 0) {
                tmp_list.push(room);
                //var index = avail_rooms.indexOf(room);
                //if (index > -1) {
                //    avail_rooms.splice(index,1);
                //}
            }

        }
        avail_rooms = tmp_list;

        // Ignore rooms with an active janitor in them
        for (var i in active_janitors) {
            var creep = janitors[i];
            var room = creep.memory.home;
            var index = avail_rooms.indexOf(room);
            if (index > -1) {
                avail_rooms.splice(index,1);
            }
        }

        // Assign inactive janitors to remaining rooms
        for (var i in avail_rooms) {
            var room = avail_rooms[i];
            if (inactive_janitors.length > 0) {
                var creep = inactive_janitors[0];
                creep.memory.home = room;
                inactive_janitors.splice(0,1);
                console.log('Assigned ',creep.name,' to ',room);
            }
        }
    }
};

module.exports = assignJanitors;