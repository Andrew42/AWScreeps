var createWorkers = {
    /** @param {Creep} creep **/
    run: function(spawn) {
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

        var upgrade_booster_template = [
            WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE
        ];

        // FOR SIMULATION
        //transporter_template = [
        //    CARRY,CARRY,
        //    MOVE
        //];

        // NOTE: This filter will return all creeps tied to the spawn's room, NOT the spawn itself
        var harvesters       = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester'       && spawn.room.name == creep.memory.home));
        var builders         = _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder'         && spawn.room.name == creep.memory.home));
        var upgraders        = _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader'        && spawn.room.name == creep.memory.home));
        var miners           = _.filter(Game.creeps, (creep) => (creep.memory.role == 'miner'           && spawn.room.name == creep.memory.home));
        var janitors         = _.filter(Game.creeps, (creep) => (creep.memory.role == 'janitor'         && spawn.room.name == creep.memory.home));
        var transporters     = _.filter(Game.creeps, (creep) => (creep.memory.role == 'transporter'     && spawn.room.name == creep.memory.home));
        var tower_fillers    = _.filter(Game.creeps, (creep) => (creep.memory.role == 'tower_filler'    && spawn.room.name == creep.memory.home));
        var linkers          = _.filter(Game.creeps, (creep) => (creep.memory.role == 'linker'          && spawn.room.name == creep.memory.home));
        var upgrade_boosters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrade_booster' && spawn.room.name == creep.memory.home));

        var curr_total_creeps = harvesters.length
                                + builders.length
                                + upgraders.length
                                + janitors.length
                                + miners.length
                                + transporters.length
                                + tower_fillers.length
                                + linkers.length;
        var curr_room_name = spawn.room.name

        console.log('Harvesters:   ' + harvesters.length + '/' + spawn.memory.worker_count.min_harvesters + '\tBuilders: ' + builders.length + '/' + spawn.memory.worker_count.min_builders);
        console.log('Upgraders:    ' + upgraders.length + '/' + spawn.memory.worker_count.min_upgraders + '\tMiners:   ' + miners.length + '/' + spawn.memory.worker_count.min_miners);
        console.log('Janitors:     ' + janitors.length + '/' + spawn.memory.worker_count.min_janitors + '\tLinkers:  ' + linkers.length + '/' + spawn.memory.worker_count.min_linkers);
        console.log('Transporters: ' + transporters.length + '/' + spawn.memory.worker_count.min_transporters + '\tFillers:  ' + tower_fillers.length + '/' + spawn.memory.worker_count.min_tower_fillers);
        console.log('Total Worker Creeps: ' + curr_total_creeps + '/' + _.sum(spawn.memory.worker_count));

        if (harvesters.length < spawn.memory.worker_count.min_harvesters) {
            var newName = spawn.createCreep(harvester_template,undefined,{
                role: 'harvester',
                home: curr_room_name,
                spawn_id: spawn.id
            });
            if (newName == ERR_NOT_ENOUGH_ENERGY && harvesters.length == 0) {
                newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined,{
                    role: 'harvester',
                    home: curr_room_name,
                    spawn_id: spawn.id
                });
            }
            console.log('Spawning new harvester: ',newName);
        } else if (miners.length < spawn.memory.worker_count.min_miners) {
            var newName = spawn.createCreep(miner_template, undefined, {
                role: 'miner',
                home: curr_room_name,
                spawn_id: spawn.id,
                assigned_source: undefined
            });
            console.log('Spawning new miner: ',newName);
        } else if (linkers.length < spawn.memory.worker_count.min_linkers) {
            var newName = spawn.createCreep(linker_template, undefined, {
                role: 'linker',
                home: curr_room_name,
                spawn_id: spawn.id
            });
            console.log('Spawning new linker: ',newName);
        } else if (transporters.length < spawn.memory.worker_count.min_transporters) {
            var newName = spawn.createCreep(transporter_template, undefined, {
                role: 'transporter',
                home: curr_room_name,
                spawn_id: spawn.id,
                assigned_container: undefined,
                assigned_storage: spawn.room.storage.id,
                path_index: 0,
                on_path: false,
                at_head: false,
                at_tail: false,
                assigned_path: []
            });
            console.log('Spawning new transporter: ',newName);
        } else if (tower_fillers.length < spawn.memory.worker_count.min_tower_fillers) {
            var newName = spawn.createCreep(tower_filler_template,undefined, {
                role: 'tower_filler',
                home: curr_room_name,
                spawn_id: spawn.id,
                assigned_room: undefined
            });
            console.log('Spawning new tower filler: ',newName);
        } else if (builders.length < spawn.memory.worker_count.min_builders) {
            var newName = spawn.createCreep(builder_template, undefined, {
                role: 'builder',
                home: curr_room_name,
                spawn_id: spawn.id
            });
            console.log('Spawning new builder: ',newName);
        } else if (janitors.length < spawn.memory.worker_count.min_janitors) {
            var newName = spawn.createCreep(janitor_template, undefined, {
                role: 'janitor',
                home: curr_room_name,
                spawn_id: spawn.id,
                assigned_room: undefined
            });
            console.log('Spawning new janitor: ',newName);
        } else if (upgraders.length < spawn.memory.worker_count.min_upgraders) {
            var newName = spawn.createCreep(upgrader_template, undefined, {
                role: 'upgrader',
                home: curr_room_name,
                spawn_id: spawn.id
            });
            console.log('Spawning new upgrader: ',newName);
        } else if (upgrade_boosters.length < spawn.memory.worker_count.min_upgrade_boosters) {
            var newName = spawn.createCreep(upgrade_booster_template,undefined, {
                role: 'upgrade_booster',
                home: curr_room_name,
                spawn_id: spawn.id
            });
        }
    }
};

module.exports = createWorkers;