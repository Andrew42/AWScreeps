var roleMiner = require('role_miner');
var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleJanitor = require('role_janitor');
var roleScout = require('role_scout');
var roleTransporter = require('role_transporter');
var roleClaimer = require('role_claimer');
var roleAttacker = require('role_attacker');
var createWorkers = require('create_workers');
var createFighters = require('create_fighters');
var structTower = require('struct_tower');
var assignMiners = require('assign_miners');
var assignJanitors = require('assign_janitors');
var assignTransporters = require('assign_transporters');
var assignClaimers = require('assign_claimers');
var getStructures = require('get_structures');

// The optimal number of workers
Memory.worker_count = {
    min_harvesters: 2,
    min_builders: 1,
    min_upgraders: 3,
    min_miners: 4,
    min_janitors: 3,
    min_transporters: 6
};

Memory.fighter_count = {
    min_attackers: 0,
    min_scouts: 2,
    min_claimers: 2
};

Memory.counter = 0;

module.exports.loop = function () {
    console.log('');
    console.log('Counter: ',Memory.counter);
    Memory.counter += 1;

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var avail_rooms = Game.rooms;       // Dictionary - {'room_name': room_obj}
    var spawn = Game.spawns['Spawn1'];  // Dictionary - {'spawn_name': spawn_obj}
    var towers = getStructures.run([spawn.room],STRUCTURE_TOWER);

    console.log('stage: ',spawn.room.controller.level);

    //tmp_lst = [];
    //for (var i in avail_rooms) {
    //    tmp_lst.push(avail_rooms[i]);
    //}
    //console.log('avail_rooms: ',avail_rooms);
    //console.log('tmp_lst: ',tmp_lst);

    //var harvs = 3;
    //var builders = 2;
    //var upgraders = 1;
    //var janitors = 0;
    //var miners = 2;
    //var max_workers = 10;

    var harvs = 2;
    var builders = 2;
    var upgraders = 3;
    var janitors = 2;
    var miners = 3;
    var transporters = 4;
    var max_workers = 25;

    var attackers = 0;
    var scouts = 2;
    var claimers = 2;
    var max_fighters = 4;

    assignMiners.run(avail_rooms);
    assignJanitors.run(avail_rooms);
    assignTransporters.run(avail_rooms);
    assignClaimers.run(avail_rooms);

    //createWorkers.run(spawn,harvs,builders,upgraders,janitors,miners,transporters,max_workers);
    //createFighters.run(spawn,attackers,scouts,claimers,max_fighters);

    createWorkers.run(spawn,max_workers);
    createFighters.run(spawn,max_fighters);

    //var storages = getStructures.run([spawn.room],STRUCTURE_STORAGE);
    //var containers = getStructures.run([spawn.room],STRUCTURE_CONTAINER);
    //for (var i in containers) {
    //    struct = Game.getObjectById(containers[i]);
    //    console.log('Struct: ',struct.structureType);
    //}
    for (var i in towers) {
        var t_obj = Game.getObjectById(towers[i]);
        structTower.run(t_obj);
        //structTower.attack(t_obj);
        //structTower.heal(t_obj);
    }

    //var scout_room = 'E63N34';  // HOME!
    var scout_room = 'E62N34';
    //var scout_room = 'E61N34';
    //var scout_room = 'E63N33';

    var scout_rooms = ['E62N34','E63N33'];
    var claim_rooms = ['E62N34','E63N33'];

    var attack_room = 'E63N33';

    var claim_room = 'E62N34';

    var s_counter = 0;
    var c_counter = 0;
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive < 16 && creep.carry.energy == 0) {
            //creep.say('SUDOKU');
            console.log(creep.name,': SUDOKU');
            creep.suicide();
        }

        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        } else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep,avail_rooms);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep,avail_rooms);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep,avail_rooms);
        } else if (creep.memory.role == 'janitor') {
            roleJanitor.run(creep);
        } else if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep,avail_rooms);
        }

        if (creep.memory.role == 'scout' && scout_rooms[s_counter] != undefined) {
            roleScout.moveToRoom(creep,scout_rooms[s_counter]);
            s_counter += 1;
        } else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep,claim_rooms[c_counter])
            c_counter += 1;
        } else if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep,attack_room);
        }
    }
}