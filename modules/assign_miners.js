var assignMiners = {

    /** @param {Creep} creep **/
    run: function(city) {
        var suburbs = Memory.city_suburbs[city];

        var active_creeps   = _.filter(Game.creeps,
            (creep) => (
                creep.memory.role == 'miner' &&
                creep.memory.home == city &&
                !creep.memory.is_zombie &&
                creep.memory.assigned_source != undefined
            )
        );
        var inactive_creeps = _.filter(Game.creeps,
            (creep) => (
                creep.memory.role == 'miner' &&
                creep.memory.home == city &&
                creep.memory.assigned_source == undefined
            )
        );

        if (inactive_creeps.length == 0) {
            return;
        }

        var avail_source_ids = [];
        for (var i in suburbs) {
            var room = Game.rooms[suburbs[i]];
            if (room == undefined) {
                continue;
            }
            var sources = room.find(FIND_SOURCES);
            for (var j in sources) {
                var source = sources[j];
                avail_source_ids.push(source.id);
            }
        }

        for (var i in active_creeps) {
            var creep = active_creeps[i];
            var source_id = creep.memory.assigned_source;
            var index = avail_source_ids.indexOf(source_id);
            if (index > -1) {
                avail_source_ids.splice(index,1);
            }
        }

        for (var i in avail_source_ids) {
            var source_id = avail_source_ids[i]
            var source_obj = Game.getObjectById(source_id);
            var source_room = source_obj.room;
            if (inactive_creeps.length > 0) {
                var creep = inactive_creeps[0];

                // Check to see if the room has any links set up
                if (source_room.memory.source_links != undefined) {
                    var source_link_ids = source_room.memory.source_links;
                    var source_link_objs = [];
                    for (var j in source_link_ids) {
                        source_link_objs.push(Game.getObjectById(source_link_ids[j]));
                    }

                    // Find the closest source link to the source
                    var closest_source_link = source_obj.pos.findClosestByPath(source_link_objs);
                    if (closest_source_link == null) {
                        /* Probably because no path exists to the link */
                        continue;
                    }
                    creep.memory.assigned_link = closest_source_link.id;
                    console.log('Assigned link to',creep.name);
                }
                creep.memory.assigned_source = source_id;
                inactive_creeps.splice(0,1);
                console.log('Assigned',creep.name,'to',source_id);
            }
        }
    }
};

module.exports = assignMiners;