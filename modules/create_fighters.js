var createFighters = {
    /** @param {Creep} creep **/
    run: function(spawn,defenders,scouts,max_creeps) {
        var min_defenders = defenders
        var min_scouts = scouts

        var max_defenders = defenders
        var max_scouts = scouts

        var max_total_creeps = max_creeps

        var fighter_template = [ATTACK,ATTACK,MOVE,MOVE,MOVE]
        var scout_template = [ATTACK,MOVE,MOVE]

        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');

        var curr_total_creeps = defenders.length + scouts.length
        var curr_room_name = spawn.room.name

        console.log('Total Fighter Creeps: ' + curr_total_creeps + '/' + max_total_creeps);


        if(defenders.length < min_defenders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(fighter_template, undefined, {role: 'defender','home': curr_room_name});
            console.log('Spawning new defender: ' + newName);
        } else if(scouts.length < min_scouts && spawn.energy >= 200 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(scout_template, undefined, {role: 'scout','home': curr_room_name});
            console.log('Spawning new scout: ' + newName);
        }
    }

};

module.exports = createFighters;