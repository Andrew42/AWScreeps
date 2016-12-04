var getStructures        = require('get_structures');
var roleMiner            = require('role_miner');
var roleHarvester        = require('role_harvester');
var roleUpgrader         = require('role_upgrader');
var roleBuilder          = require('role_builder');
var roleJanitor          = require('role_janitor');
var roleScout            = require('role_scout');
var roleTransporter      = require('role_transporter');
var roleReserver         = require('role_reserver');
var roleAttacker         = require('role_attacker');
var roleTowerFiller      = require('role_tower_filler');
var roleLinker           = require('role_linker');
var roleUpgradeBooster   = require('role_upgrade_booster');
var roleTransportBooster = require('role_transport_booster');
var roleMinerBooster     = require('role_miner_booster');
var roleStarter          = require('role_starter');
var roleClaimer          = require('role_claimer');
var roleDefender         = require('role_defender');
var roleHealer           = require('role_healer');
var createWorkers        = require('create_workers');
var createFighters       = require('create_fighters');
var structTower          = require('struct_tower');
var structLink           = require('struct_link');
var scanEnemies          = require('scan_enemies');
var assignMiners         = require('assign_miners');
var assignJanitors       = require('assign_janitors');
var assignTransporters   = require('assign_transporters');
var assignReservers      = require('assign_reservers');
var assignTowerFillers   = require('assign_tower_fillers');
var assignStructLinks    = require('assign_struct_links');
var assignDefenders      = require('assign_defenders');
var assignAttackers      = require('assign_attackers');

Memory.alliances = [
    'cyberlink916'
];

// Order determines spawn priority
Memory.all_roles = [
    'harvester',
    'linker',
    'tower_filler',
    'janitor',
    'miner',
    'transporter',
    'builder',
    'reserver',
    'starter',
    'upgrader',
    'transport_booster',
    'upgrade_booster',
    'miner_booster'
];

// Target worker counts for my cities
Memory.cities = {
    'E63N34': {
        worker_count: {
            'harvester': 2,
            'builder': 0,
            'upgrader': 3,
            'miner': 5,
            'janitor': 2,
            'transporter': 3,
            'tower_filler': 1,
            'linker': 1,
            'upgrade_booster': 0,
            'transport_booster':0,
            'miner_booster':0,
            'starter': 0,
            'reserver': 3
        }
    },
    'E64N32': {
        worker_count: {
            'harvester': 2,
            'builder': 0,
            'upgrader': 2,
            'miner': 4,
            'janitor': 2,
            'transporter': 3,
            'tower_filler': 1,
            'linker': 1,
            'upgrade_booster': 0,
            'transport_booster':0,
            'miner_booster':0,
            'starter': 0,
            'reserver': 3
        }
    }
};

// For going to war
//Memory.cities = {
//    'E63N34': {
//        worker_count: {
//            'harvester': 2,
//            'builder': 0,
//            'upgrader': 0,
//            'miner': 5,
//            'janitor': 1,
//            'transporter': 0,
//            'tower_filler': 1,
//            'linker': 1,
//            'upgrade_booster': 0,
//            'transport_booster':0,
//            'miner_booster':0,
//            'starter': 0,
//            'reserver': 0
//        }
//    },
//    'E64N32': {
//        worker_count: {
//            'harvester': 2,
//            'builder': 0,
//            'upgrader': 0,
//            'miner': 4,
//            'janitor': 1,
//            'transporter': 0,
//            'tower_filler': 1,
//            'linker': 1,
//            'upgrade_booster': 0,
//            'transport_booster':0,
//            'miner_booster':0,
//            'starter': 0,
//            'reserver': 0
//        }
//    }
//};


Memory.fighter_count = {
    'attacker': 1,
    'scout': 6,
    'claimer': 0,
    'defender': 6
};

// Designated suburbs of each of my cities (Note: The city itself is always the last in the list)
Memory.city_suburbs = {
    'E63N34': [
        'E62N33',
        'E62N34',
        'E63N33',
        'E63N34'
    ],
    'E64N32': [
        'E64N32',
        'E64N33',
        'E64N31',
        'E63N32'
    ],
};

Memory.defend_rooms = [
    'E62N34',
    'E62N33',
    'E63N32',
    'E64N33',
    'E64N31',
    'E64N32'
];

Memory.boost_rooms = [
    'E64N32'
];

Memory.cached_hostile_ids = {
    'E63N34': {},
    'E64N32': {}
};

//TypeError: Cannot read property 'link_type' of undefined
//    at _.filter (assign_struct_links:19:107)
//    at arrayFilter (/opt/engine/node_modules/lodash/index.js:1384:13)
//    at Function.filter (/opt/engine/node_modules/lodash/index.js:6309:14)
//    at Object.run (assign_struct_links:18:39)
//    at Object.module.exports.loop (main:225:27)
//    at __mainLoop:1:52



Memory.struct_links['583df7300bc6b7373407c8dd'] = {link_type:'source_link'};
Memory.struct_links['5841e39372eeb3513921b123'] = {link_type:'source_link'};
Memory.struct_links['5841e96d9c4a41ea6f31f1df'] = {link_type:'storage_link'};

Memory.counter = 0;

// Note: This is to preserve target number of creeps for production
for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    creep.memory.is_zombie = false;
}

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

    //var attack_rooms = ['E64N32'];
    //var attack_rooms = ['E63N34']
    
    var attack_rooms = ['E64N32']
    //var attack_rooms = [null];
    var boost_room = 'E64N32';
    var claim_room = '';

    var scout_rooms = [];
    for (var city in Memory.cities) {
        for (var i in Memory.city_suburbs[city]) {
            var room_name = Memory.city_suburbs[city][i];
            var room = Game.rooms[room_name];
            if (room == undefined) {
                scout_rooms.push(room_name);
                continue;
            } else if (room.controller.level > 0) {
                continue;
            } else {
                scout_rooms.push(room_name);
            }
        }
    }

    assignDefenders.run(Memory.defend_rooms);
    assignAttackers.run();

    for (var city in Memory.cities) {
        let room = Game.rooms[city];
        console.log('City:',city);
        console.log(
            'Progress:',
            room.controller.progress+'/'+room.controller.progressTotal,
            '('+(100*room.controller.progress/room.controller.progressTotal).toFixed(2)+'%)'
        );

        assignMiners.run(city);
        assignJanitors.run(city);
        assignTransporters.run(city);
        assignReservers.run(city);
        assignTowerFillers.run(city);
        assignStructLinks.run(city);

        createWorkers.run(city);

        var valid_enemies = scanEnemies.run(city);
        var towers = getStructures.run([room],STRUCTURE_TOWER);
        var links = getStructures.run([room],STRUCTURE_LINK);

        for (var i in towers) {
            var t_obj = Game.getObjectById(towers[i]);
            structTower.run(t_obj,valid_enemies);
        }

        for (var i in links) {
            var l_obj = Game.getObjectById(links[i]);
            structLink.run(l_obj);
        }
    }

    var spawn_body_part_count = {};
    for (let i in Game.spawns) {
        let spawn = Game.spawns[i];
        createFighters.run(spawn);

        spawn_body_part_count[spawn.id] = 0;
    }

    console.log('Bucket:',Game.cpu.bucket);

    var s_counter = 0;
    var body_part_count = 0;
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        body_part_count += creep.body.length;
        spawn_body_part_count[creep.memory.spawn_id] += creep.body.length;

        //if (creep.ticksToLive < 16 && creep.carry.energy == 0) {
        //    console.log(creep.name,': SUDOKU');
        //    creep.suicide();
        //}

        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        } else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'janitor') {
            roleJanitor.run(creep);
        } else if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        } else if (creep.memory.role == 'tower_filler') {
            roleTowerFiller.run(creep);
        } else if (creep.memory.role == 'linker') {
            roleLinker.run(creep);
        } else if (creep.memory.role == 'upgrade_booster') {
            roleUpgradeBooster.run(creep,boost_room);
        } else if (creep.memory.role == 'transport_booster') {
            roleTransportBooser.run(creep,boost_room);
        } else if (creep.memory.role == 'miner_booster') {
            roleMinerBooster.run(creep,boost_room);
        } else if (creep.memory.role == 'starter') {
            roleStarter.run(creep);
        }

        if (creep.memory.role == 'scout') {
            if (scout_rooms[s_counter] != undefined) {                
                roleScout.moveToRoom(creep,scout_rooms[s_counter]);
                s_counter += 1;
            }
        } else if (creep.memory.role == 'reserver') {
            roleReserver.run(creep)
        } else if (creep.memory.role == 'attacker') {
            if (attack_rooms.length > 0) {
                roleAttacker.run(creep,attack_rooms[0]);
            } else {
                roleAttacker.run(creep,null);
            }
        } else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep,claim_room);
        } else if (creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
    }
    console.log('Total Creep Parts:',body_part_count);
    for (let spawn_id in spawn_body_part_count) {
        console.log(spawn_id,'parts:',spawn_body_part_count[spawn_id]);
    }
}