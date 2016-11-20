var assignMiners = {

    /** @param {Creep} creep **/
    run: function(avail_rooms) {
        var avail_sources = [];
        var assigned_sources = [];

        for (var i in avail_rooms) {
            var room = avail_rooms[i];
            var sources = room.find(FIND_SOURCES);
            for (var j in sources) {
                var source = sources[j];
                avail_sources.push(source.id);
            }
        }

        var active_miners = _.filter(Game.creeps, (creep) => (creep.memory.role == 'miner' && creep.memory.assigned_source != undefined));
        var inactive_miners = _.filter(Game.creeps, (creep) => (creep.memory.role == 'miner' && creep.memory.assigned_source == undefined));
        
        for (var i in active_miners) {
            var creep = active_miners[i];
            var source_id = creep.memory.assigned_source;
            var index = avail_sources.indexOf(source_id);
            if (index > -1) {
                avail_sources.splice(index,1);
            }
            //console.log('Active Miner: ',creep.name);
        }

        for (var i in inactive_miners) {
            var creep = inactive_miners[i];
            //console.log('Inactive Miner: ',creep.name);
        }

        for (var i in avail_sources) {
            var source = avail_sources[i];
            if (inactive_miners.length > 0) {
                var creep = inactive_miners[0];
                creep.memory.assigned_source = source;
                inactive_miners.splice(0,1);
                console.log('Assigned ',creep.name,' to ',source);
            }
        }
    }
};

module.exports = assignMiners;