var createFighters = {
    /** @param {Creep} creep **/
    //run: function(spawn,attackers,scouts,claimers,max_creeps) {
    run: function(spawn,max_creeps) {
        //var min_attackers = attackers;
        //var min_scouts = scouts
        //var min_claimers = claimers;
        //var max_attackers = attackers
        //var max_scouts = scouts
        //var max_claimers = claimers;

        var max_total_creeps = max_creeps

        var fighter_template = [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE]
        var scout_template = [MOVE]
        var claimer_template = [CLAIM,CLAIM,MOVE,MOVE];

        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

        var curr_total_creeps = attackers.length + scouts.length + claimers.length;
        var curr_room_name = spawn.room.name

        console.log('Total Fighter Creeps: ' + curr_total_creeps + '/' + max_total_creeps);


        if (attackers.length < Memory.fighter_count.min_attackers && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(fighter_template, undefined, {
                role: 'attacker',
                home: curr_room_name
            });
            console.log('Spawning new attacker: ',newName);
        } else if (scouts.length < Memory.fighter_count.min_scouts && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(scout_template, undefined, {
                role: 'scout',
                home: curr_room_name
            });
            console.log('Spawning new scout: ',newName);
        } else if (claimers.length < Memory.fighter_count.min_claimers && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(claimer_template, undefined, {
                role: 'claimer',
                home: curr_room_name,
                assigned_room: undefined
            });
            console.log('Spawning new claimer: ',newName)
        }
    }

};

module.exports = createFighters;