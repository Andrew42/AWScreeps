var createFighters = {
    /** @param {Creep} creep **/
    //run: function(spawn,attackers,scouts,claimers,max_creeps) {
    run: function(spawn) {
        //var min_attackers = attackers;
        //var min_scouts = scouts
        //var min_claimers = claimers;
        //var max_attackers = attackers
        //var max_scouts = scouts
        //var max_claimers = claimers;

        var fighter_template = [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE]
        var scout_template = [MOVE]
        var claimer_template = [CLAIM,CLAIM,MOVE,MOVE];

        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

        var curr_total_creeps = attackers.length + scouts.length + claimers.length;
        var curr_room_name = spawn.room.name

        console.log('Total Fighter Creeps: ' + curr_total_creeps + '/' + _.sum(spawn.memory.fighter_count));


        if (attackers.length < spawn.memory.fighter_count.min_attackers) {
            var newName = spawn.createCreep(fighter_template, undefined, {
                role: 'attacker',
                home: curr_room_name,
                spawn_id: spawn.id
            });
            console.log('Spawning new attacker: ',newName);
        } else if (scouts.length < spawn.memory.fighter_count.min_scouts) {
            var newName = spawn.createCreep(scout_template, undefined, {
                role: 'scout',
                home: curr_room_name,
                spawn_id: spawn.id
            });
            console.log('Spawning new scout: ',newName);
        } else if (claimers.length < spawn.memory.fighter_count.min_claimers) {
            var newName = spawn.createCreep(claimer_template, undefined, {
                role: 'claimer',
                home: curr_room_name,
                spawn_id: spawn.id,
                assigned_room: undefined
            });
            console.log('Spawning new claimer: ',newName)
        }
    }

};

module.exports = createFighters;