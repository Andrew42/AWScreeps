var roleMiner = require('role_miner');
var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleJanitor = require('role_janitor');
var roleScout = require('role_scout');
var roleTransporter = require('role_transporter');
var roleClaimer = require('role_claimer');
var roleAttacker = require('role_attacker');
var roleTowerFiller = require('role_tower_filler');
var roleLinker = require('role_linker');
var createWorkers = require('create_workers');
var createFighters = require('create_fighters');
var structTower = require('struct_tower');
var structLink = require('struct_link');
var assignMiners = require('assign_miners');
var assignJanitors = require('assign_janitors');
var assignTransporters = require('assign_transporters');
var assignClaimers = require('assign_claimers');
var assignTowerFillers = require('assign_tower_fillers');
var assignStructLinks = require('assign_struct_links');
var getStructures = require('get_structures');

// The optimal number of workers
Memory.worker_count = {
    min_harvesters: 2,
    min_builders: 2,
    min_upgraders: 2,
    min_miners: 4,
    min_janitors: 3,
    min_transporters: 5,
    min_tower_fillers: 1,
    min_linkers: 1
};

Memory.fighter_count = {
    min_attackers: 0,
    min_scouts: 2,
    min_claimers: 2
};

//Memory.struct_links = {
//    '583626d1e88c4dfa1e41aaa2': {link_type: null},
//    '58361ed2ed0581cd46e5550f': {link_type: null}
//}

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

    //Game.rooms --> Dictionary - {'room_name': room_obj}
    var my_rooms = ['E62N34','E63N33','E63N34'];
    var avail_rooms = {};
    for (var i in my_rooms) {
        var room_name = my_rooms[i];
        avail_rooms[room_name] = Game.rooms[room_name];
    }

    var spawn = Game.spawns['Spawn1'];  // Dictionary - {'spawn_name': spawn_obj}
    var towers = getStructures.run([spawn.room],STRUCTURE_TOWER);
    var links = getStructures.run([spawn.room],STRUCTURE_LINK);

    assignMiners.run(avail_rooms);
    assignJanitors.run(avail_rooms);
    assignTransporters.run(avail_rooms);
    assignTowerFillers.run(avail_rooms);
    assignClaimers.run(avail_rooms);

    assignStructLinks.run(avail_rooms);

    createWorkers.run(spawn);
    createFighters.run(spawn);

    for (var i in towers) {
        var t_obj = Game.getObjectById(towers[i]);
        structTower.run(t_obj);
    }

    for (var i in links) {
        var l_obj = Game.getObjectById(links[i]);
        structLink.run(l_obj);
    }

    var scout_rooms = my_rooms;

    //var attack_room = 'E63N33';
    //var attack_room = 'E64N34';

    var s_counter = 0;
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive < 16 && creep.carry.energy == 0) {
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
        } else if (creep.memory.role == 'tower_filler') {
            roleTowerFiller.run(creep);
        } else if (creep.memory.role == 'linker') {
            roleLinker.run(creep);
        }

        if (creep.memory.role == 'scout' && scout_rooms[s_counter] != undefined) {
            if (Game.rooms[scout_rooms[s_counter]].controller.level == 0) {
                roleScout.moveToRoom(creep,scout_rooms[s_counter]);
                s_counter += 1;
            }
        } else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep)
        } else if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep,attack_room);
        }
    }
}