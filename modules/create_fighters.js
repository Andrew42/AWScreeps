var createFighters = {
    /** @param {Creep} creep **/
    run: function(spawn,defenders,scouts,claimers,max_creeps) {
        var min_defenders = defenders
        var min_scouts = scouts
        var min_claimers = claimers;

        var max_defenders = defenders
        var max_scouts = scouts
        var max_claimers = claimers;

        var max_total_creeps = max_creeps

        var fighter_template = [ATTACK,ATTACK,MOVE,MOVE,MOVE]
        var scout_template = [MOVE]
        var claimer_template = [CLAIM,MOVE];

        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

        var curr_total_creeps = defenders.length + scouts.length + claimers.length;
        var curr_room_name = spawn.room.name

        console.log('Total Fighter Creeps: ' + curr_total_creeps + '/' + max_total_creeps);


        if (defenders.length < min_defenders && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(fighter_template, undefined, {
                role: 'defender',
                home: curr_room_name
            });
            console.log('Spawning new defender: ',newName);
        } else if (scouts.length < min_scouts && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(scout_template, undefined, {
                role: 'scout',
                home: curr_room_name
            });
            console.log('Spawning new scout: ',newName);
        } else if (claimers.length < min_claimers && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(claimer_template, undefined, {
                role: 'claimer',
                home: curr_room_name
            });
            console.log('Spawning new claimer: ',newName)
        }
    }

};

module.exports = createFighters;