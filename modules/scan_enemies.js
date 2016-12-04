var scanEnemies = {

    /** @param {Creep} creep **/
    // Note: This function increments the cached_hostile_ids and returns a list of valid attack targets
    run: function(room_name) {
        var target_threshold = 3;   // Number of consecutive ticks the enemy must be in the room to be a valid target
        var room = Game.rooms[room_name];

        var curr_hostiles = room.find(FIND_HOSTILE_CREEPS);
        var curr_hostile_ids = [];
        for (var i in curr_hostiles) {
            var hostile = curr_hostiles[i];
            curr_hostile_ids.push(hostile.id);
        }

        var old_hostile_ids = _.keys(Memory.cached_hostile_ids[room_name]);

        var new_hostile_ids = _.difference(curr_hostile_ids,old_hostile_ids);
        var missing_hostile_ids = _.difference(old_hostile_ids,curr_hostile_ids);
        var not_new_hostile_ids = _.intersection(old_hostile_ids,curr_hostile_ids);

        for (var i in new_hostile_ids) {
            var new_id = new_hostile_ids[i];
            Memory.cached_hostile_ids[room_name][new_id] = 0;
        }

        for (var i in missing_hostile_ids) {
            var missing_id = missing_hostile_ids[i];
            Memory.cached_hostile_ids[room_name] = _.omit(Memory.cached_hostile_ids[room_name],missing_id);
        }

        var valid_targets = [];
        for (var hostile_id in Memory.cached_hostile_ids[room_name]) {
            Memory.cached_hostile_ids[room_name][hostile_id]  += 1;
            if (Memory.cached_hostile_ids[room_name][hostile_id] > target_threshold) {
                valid_targets.push(Game.getObjectById(hostile_id));
            }
        }

        return valid_targets;
    },
};

module.exports = scanEnemies;