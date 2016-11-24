var assignMiners = {

    /** @param {Creep} creep **/
    run: function(avail_rooms) {
        var active_miners = _.filter(Game.creeps, (creep) => (creep.memory.role == 'miner' && creep.memory.assigned_source != undefined));
        var inactive_miners = _.filter(Game.creeps, (creep) => (creep.memory.role == 'miner' && creep.memory.assigned_source == undefined));

        if (inactive_miners.length == 0) {
            return;
        }

        var avail_sources = [];
        var assigned_sources = [];

        for (var i in avail_rooms) {
            var room = avail_rooms[i];
            var sources = room.find(FIND_SOURCES);
            for (var j in sources) {
                var source = sources[j];
                if (source.id == '57ef9e5a86f108ae6e60f2e7') {
                    continue;
                } else if (source.id == '57ef9e6f86f108ae6e60f4b6') {
                    continue;
                }
                avail_sources.push(source.id);
            }
        }


        for (var i in active_miners) {
            var creep = active_miners[i];
            var source_id = creep.memory.assigned_source;
            var index = avail_sources.indexOf(source_id);
            if (index > -1) {
                avail_sources.splice(index,1);
            }
            //console.log('Active Miner: ',creep.name);
        }

        for (var i in avail_sources) {
            var source_obj = Game.getObjectById(avail_sources[i]);
            var source_id = source_obj.id;
            var source_room = source_obj.room;

            console.log('Available source: ',source_id);
            if (inactive_miners.length > 0) {
                var creep = inactive_miners[0];
                if (source_room.memory.source_links != undefined) {
                    var source_link_ids = source_room.memory.source_links;
                    var source_link_objs = []
                    for (var j in source_link_ids) {
                        source_link_objs.push(Game.getObjectById(source_link_ids[j]));
                    }
                    var closest_source_link = source_obj.pos.findClosestByPath(source_link_objs);
                    creep.memory.assigned_link = closest_source_link.id;
                }
                creep.memory.assigned_source = source_id;
                inactive_miners.splice(0,1);
                console.log('Assigned ',creep.name,' to ',source_id);
            }
        }
    }
};

module.exports = assignMiners;