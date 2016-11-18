var createFighters = {
    /** @param {Creep} creep **/
    run: function(spawn) {
        var min_defenders = 0
        var min_scouts = 0

        var max_defenders = 0
        var max_scouts = 0

        var max_total_creeps = 0

        var fighter_template = [ATTACK,ATTACK,MOVE,MOVE,MOVE]
        var scout_template = [ATTACK,MOVE,MOVE,MOVE,MOVE]

        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');

        var curr_total_creeps = defenders.length + scouts.length
        var curr_room_name = spawn.room.name

        console.log('Total Fighter Creeps: ' + curr_total_creeps);


        if(defenders.length < min_harvesters && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(fighter_template, undefined, {role: 'defender','home': curr_room_name});
            console.log('Spawning new defender: ' + newName);
        } else if(scouts.length)
    }

};

module.exports = createFighters;