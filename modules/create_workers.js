var createWorkers = {
    /** @param {Creep} creep **/
    run: function(spawn,harvesters,builders,upgraders,janitors,miners,max_creeps) {
        var min_harvesters = harvesters;
        var min_builders = builders;
        var min_upgraders = upgraders;
        var min_janitors = janitors;
        var min_miners = miners;

        var max_harvesters = harvesters;
        var max_builders = builders;
        var max_upgraders = upgraders;
        var max_janitors = janitors;
        var max_miners = miners;

        var max_total_creeps = max_creeps

        var miner_template     = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        var builder_template   = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var upgrader_template  = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        var janitor_template   = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
        var harvester_template = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var janitors = _.filter(Game.creeps, (creep) => creep.memory.role == 'janitor');
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

        var curr_total_creeps = harvesters.length + builders.length + upgraders.length + janitors.length + miners.length;
        var curr_room_name = spawn.room.name

        console.log('');
        console.log('Harvesters: ' + harvesters.length + '/' + min_harvesters + '\tBuilders: ' + builders.length + '/' + min_builders);
        console.log('Upgraders:  ' + upgraders.length + '/' + min_upgraders + '\tMiners:   ' + miners.length + '/' + min_miners);
        //console.log('Janitors: ' + janitors.length + '/' + min_janitors);
        console.log('Total Worker Creeps: ' + curr_total_creeps + '/' + max_total_creeps);

        if (harvesters.length < min_harvesters && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(harvester_template,undefined,{role: 'harvester', home: curr_room_name});
            console.log('Spawning new harvester: ' + newName);
        }

        if (miners.length < min_miners && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(miner_template, undefined, {role: 'miner', home: curr_room_name, assigned_source: undefined});
            console.log('Spawning new miner: ' + newName);
        }

        if (builders.length < min_builders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(builder_template, undefined, {role: 'builder', home: curr_room_name});
            console.log('Spawning new builder: ' + newName);
        }

        if (janitors.length < min_janitors && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(janitor_template, undefined, {role: 'janitor', home: undefined});
            console.log('Spawning new janitor: ' + newName);
        }

        if (upgraders.length < min_upgraders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(upgrader_template, undefined, {role: 'upgrader', home: curr_room_name});
            console.log('Spawning new upgrader: ' + newName);
        }
    }
};

module.exports = createWorkers;