var createWorkers = {
    /** @param {Creep} creep **/
    //run: function(spawn,harvesters,builders,upgraders,janitors,miners,transporters,max_creeps) {
    run: function(spawn) {
        //var min_harvesters   = harvesters;
        //var min_builders     = builders;
        //var min_upgraders    = upgraders;
        //var min_janitors     = janitors;
        //var min_miners       = miners;
        //var min_transporters = transporters;

        //var max_harvesters  = harvesters;
        //var max_builders    = builders;
        //var max_upgraders   = upgraders;
        //var max_janitors    = janitors;
        //var max_miners      = miners;
        //var max_tansporters = transporters;

        // Current Max - 1800
        var miner_template     = [
            WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,MOVE,
            MOVE,MOVE
        ];
        var upgrader_template  = [
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
        ];
        var builder_template   = [
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE
        ];
        var janitor_template   = [
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ];
        var harvester_template = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ];
        var transporter_template = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
        ];
        var tower_filler_template = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ];

        var linker_template = [
            CARRY,CARRY,
            MOVE
        ];

        var harvesters   = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders     = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders    = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var miners       = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var janitors     = _.filter(Game.creeps, (creep) => creep.memory.role == 'janitor');
        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        var tower_fillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tower_filler');
        var linkers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linker');

        //for (var i in transporters) {
        //    console.log('Name: ',transporters[i].name, ' Container: ',transporters[i].memory.assigned_container);
        //}

        var curr_total_creeps = harvesters.length
                                + builders.length
                                + upgraders.length
                                + janitors.length
                                + miners.length
                                + transporters.length
                                + tower_fillers.length
                                + linkers.length;
        var curr_room_name = spawn.room.name

        console.log('Harvesters:   ' + harvesters.length + '/' + Memory.worker_count.min_harvesters + '\tBuilders: ' + builders.length + '/' + Memory.worker_count.min_builders);
        console.log('Upgraders:    ' + upgraders.length + '/' + Memory.worker_count.min_upgraders + '\tMiners:   ' + miners.length + '/' + Memory.worker_count.min_miners);
        console.log('Janitors:     ' + janitors.length + '/' + Memory.worker_count.min_janitors + '\tLinkers:  ' + linkers.length + '/' + Memory.worker_count.min_linkers);
        console.log('Transporters: ' + transporters.length + '/' + Memory.worker_count.min_transporters + '\tFillers:  ' + tower_fillers.length + '/' + Memory.worker_count.min_tower_fillers);
        console.log('Total Worker Creeps: ' + curr_total_creeps + '/' + _.sum(Memory.worker_count));

        //if (curr_total_creeps >= max_total_creeps) {
        //    return;
        //}

        if (harvesters.length < Memory.worker_count.min_harvesters) {
            var newName = spawn.createCreep(harvester_template,undefined,{
                role: 'harvester',
                home: curr_room_name
            });
            if (newName == ERR_NOT_ENOUGH_ENERGY && harvesters.length == 0) {
                newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined,{
                    role: 'harvester',
                    home: curr_room_name
                });
            }
            console.log('Spawning new harvester: ',newName);
        } else if (miners.length < Memory.worker_count.min_miners) {
            var newName = spawn.createCreep(miner_template, undefined, {
                role: 'miner',
                home: curr_room_name,
                assigned_source: undefined
            });
            console.log('Spawning new miner: ',newName);
        } else if (linkers.length < Memory.worker_count.min_linkers) {
            var newName = spawn.createCreep(linker_template, undefined, {
                role: 'linker',
                home: curr_room_name
            });
            console.log('Spawning new linker: ',newName);
        } else if (transporters.length < Memory.worker_count.min_transporters) {
            var newName = spawn.createCreep(transporter_template, undefined, {
                role: 'transporter',
                home: undefined,
                assigned_container: undefined,
                assigned_storage: spawn.room.storage.id
            });
            console.log('Spawning new transporter: ',newName);
        } else if (tower_fillers.length < Memory.worker_count.min_tower_fillers) {
            var newName = spawn.createCreep(tower_filler_template,undefined, {
                role: 'tower_filler',
                home: curr_room_name,
                assigned_room: undefined
            });
            console.log('Spawning new tower filler: ',newName);
        } else if (builders.length < Memory.worker_count.min_builders) {
            var newName = spawn.createCreep(builder_template, undefined, {
                role: 'builder',
                home: curr_room_name
            });
            console.log('Spawning new builder: ',newName);
        } else if (janitors.length < Memory.worker_count.min_janitors) {
            var newName = spawn.createCreep(janitor_template, undefined, {
                role: 'janitor',
                home: curr_room_name,
                assigned_room: undefined
            });
            console.log('Spawning new janitor: ',newName);
        } else if (upgraders.length < Memory.worker_count.min_upgraders) {
            var newName = spawn.createCreep(upgrader_template, undefined, {
                role: 'upgrader',
                home: curr_room_name
            });
            console.log('Spawning new upgrader: ',newName);
        }
    }
};

module.exports = createWorkers;