        var fighter_template = [
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            MOVE,MOVE,MOVE,MOVE
        ];
        var scout_template = [
            MOVE
        ];
        var reserver_template = [
            CLAIM,CLAIM,
            MOVE,MOVE
        ];
        var claimer_template = [
            CLAIM,
            MOVE
        ];
        var defender_template = [
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            MOVE,MOVE,MOVE,MOVE,
            HEAL
        ];

var createFighters = {
    /** @param {Creep} creep **/
    run: function(spawn) {
        if (spawn.room.controller.level < 4) {
            return;
        }

        var creation_map = {
            'attacker': this.createAttacker,
            'scout':    this.createScout,
            'reserver': this.createReserver,
            'claimer':  this.createClaimer,
            'defender': this.createDefender
        }

        var needed_fighters = Memory.fighter_count;
        var current_fighters = {}
        var curr_total = 0;
        var needed_total = _.sum(needed_fighters);
        for (var role in needed_fighters) {
            var creep_list = _.filter(Game.creeps, (creep) => (creep.memory.role == role));
            current_fighters[role] = creep_list.length;
            curr_total += creep_list.length;
            //console.log(role,':',creep_list.length);
            //console.log(role,':',creep_list.length,'/',needed_workers[role]);
        }
        console.log('Total fighter creeps:',curr_total+'/'+needed_total);

        if (spawn.spawning != null) {
            return;
        }

        //TODO: Move this to memory
        var fighter_roles = ['attacker','scout','reserver','claimer','defender'];

        for (var i in fighter_roles) {
            var role = fighter_roles[i];
            if (current_fighters[role] < needed_fighters[role]) {
                creation_map[role](spawn,current_fighters[role]);
                break;
            }
        }
////////////////////////////////////////////////////////////////////////////////////////////////////
        //var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        //var scouts    = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        //var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver');
        //var claimers  = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

        //var curr_total_creeps = attackers.length +
        //                        scouts.length +
        //                        reservers.length +
        //                        claimers.length;
        //var curr_room_name = spawn.room.name
        //console.log('Total Fighter Creeps: ' + curr_total_creeps + '/' + _.sum(spawn.memory.fighter_count));
        //if (attackers.length < spawn.memory.fighter_count.min_attackers) {
        //    var newName = spawn.createCreep(fighter_template, undefined, {
        //        role: 'attacker',
        //        home: curr_room_name,
        //        spawn_id: spawn.id
        //    });
        //    console.log('Spawning new attacker: ',newName);
        //} else if (scouts.length < spawn.memory.fighter_count.min_scouts) {
        //    var newName = spawn.createCreep(scout_template, undefined, {
        //        role: 'scout',
        //        home: curr_room_name,
        //        spawn_id: spawn.id
        //    });
        //    console.log('Spawning new scout: ',newName);
        //} else if (reservers.length < spawn.memory.fighter_count.min_reservers) {
        //    var newName = spawn.createCreep(reserver_template, undefined, {
        //        role: 'reserver',
        //        home: curr_room_name,
        //        spawn_id: spawn.id,
        //        assigned_room: undefined
        //    });
        //    console.log('Spawning new reserver: ',newName)
        //} else if (claimers.length < spawn.memory.fighter_count.min_claimers) {
        //    var newName = spawn.createCreep(claimer_template, undefined, {
        //        role: 'claimer',
        //        home: curr_room_name,
        //        spawn_id: spawn.id,
        //    });
        //    console.log('Spawning new claimer: ',newName);
        //}
    },

    createAttacker: function(spawn,current_amount) {
        var newName = spawn.createCreep(fighter_template, undefined, {
            role: 'attacker',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
        console.log('Spawning new attacker: ',newName);
    },

    createScout: function(spawn,current_amount) {
        var newName = spawn.createCreep(scout_template, undefined, {
            role: 'scout',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
        console.log('Spawning new scout: ',newName);
    },

    createReserver: function(spawn,current_amount) {
        var newName = spawn.createCreep(reserver_template, undefined, {
            role: 'reserver',
            home: spawn.room.name,
            spawn_id: spawn.id,
            assigned_room: undefined
        });
        console.log('Spawning new reserver: ',newName) 
    },

    createClaimer: function(spawn,current_amount) {
        var newName = spawn.createCreep(claimer_template, undefined, {
            role: 'claimer',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
        console.log('Spawning new claimer: ',newName); 
    },

    createDefender: function(spawn,current_amount) {
        var newName = spawn.createCreep(defender_template, undefined, {
            role: 'defender',
            home: spawn.room.name,
            spawn_id: spawn.id
        })
    }

};

module.exports = createFighters;