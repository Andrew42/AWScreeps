var assignAttackers = {
    run: function() {
        var active_creeps = _.filter(Game.creeps,
            (creep) => (
                creep.memory.role == 'attacker' && creep.memory.assigned_room != undefined
            )
        );
        var inactive_creeps = _.filter(Game.creeps,
            (creep) => (
                creep.memory.role == 'attacker' && creep.memory.assigned_room == undefined
            )
        );

        if (inactive_creeps.length == 0 || inactive_creeps.length == undefined) {
            return;
        }

        var count_map = [];
        var start_val = 0;
        for (let city in Memory.cities) {
            count_obj = {city: city, count: start_val};
            count_map.push(count_obj);
        }

        for (let i in inactive_creeps) {
            let creep = inactive_creeps[i];
            target_city = _.min(count_map,
                (obj) => (
                    obj.count
                )
            );
            creep.memory.assigned_room = target_city.city;
            for (let i in count_map) {
                if (count_map[i].city == target_city.city) {
                    count_map[i].count += 1;
                }
            }
        }
    }
};

module.exports = assignAttackers;