var getStructures      = require('get_structures');
var roleMiner          = require('role_miner');
var roleHarvester      = require('role_harvester');
var roleUpgrader       = require('role_upgrader');
var roleBuilder        = require('role_builder');
var roleJanitor        = require('role_janitor');
var roleScout          = require('role_scout');
var roleTransporter    = require('role_transporter');
var roleReserver       = require('role_reserver');
var roleAttacker       = require('role_attacker');
var roleTowerFiller    = require('role_tower_filler');
var roleLinker         = require('role_linker');
var roleUpgradeBooster = require('role_upgrade_booster');
var roleStarter        = require('role_starter');
var roleClaimer        = require('role_claimer');
var roleDefender       = require('role_defender');
var createWorkers      = require('create_workers');
var createFighters     = require('create_fighters');
var structTower        = require('struct_tower');
var structLink         = require('struct_link');
var assignMiners       = require('assign_miners');
var assignJanitors     = require('assign_janitors');
var assignTransporters = require('assign_transporters');
var assignReservers    = require('assign_reservers');
var assignTowerFillers = require('assign_tower_fillers');
var assignStructLinks  = require('assign_struct_links');
var assignDefenders    = require('assign_defenders');

// Order determines spawn priority
Memory.all_roles = [
    'harvester',
    'janitor',
    'linker',
    'tower_filler',
    'miner',
    'builder',
    'transporter',
    'starter',
    'upgrader',
    'upgrade_booster'
];

// Target worker counts for my cities
Memory.cities = {
    'E63N34': {
        worker_count: {
            'harvester': 2,
            'builder': 1,
            'upgrader': 1,
            'miner': 5,
            'janitor': 4,
            'transporter': 7,
            'tower_filler': 1,
            'linker': 1,
            'upgrade_booster': 1,
            'starter': 0
        }
    },
    'E64N32': {
        worker_count: {
            'harvester': 0,
            'builder': 0,
            'upgrader': 0,
            'miner': 0,
            'janitor': 0,
            'transporter': 0,
            'tower_filler': 1,
            'linker': 0,
            'upgrade_booster': 0,
            'starter': 4
        }
    }
};

Memory.fighter_count = {
    'attacker': 1,
    'scout': 4,
    'reserver': 3,
    'claimer': 0,
    'defender': 4
}

// Designated suburbs of each of my cities (Note: The city itself is always the last in the list)
Memory.city_suburbs = {
    'E63N34': [
        'E62N33',
        'E62N34',
        'E63N33',
        'E63N34'
    ],
    'E64N32': [
        'E64N32'
    ],
}

//// TODO: Will want to make fighter thresholds 'global'
//Game.spawns['Spawn1'].memory.fighter_count = {
//    min_attackers: 1,
//    min_scouts: 4,
//    min_reservers: 3,
//    min_claimers: 0
//};

//// TODO: Will want to make fighter thresholds 'global'
//Game.spawns['Spawn2_1'].memory.fighter_count = {
//    min_attackers: 0,
//    min_scouts: 0,
//    min_reservers: 0,
//    min_claimers: 0
//};

//Game.spawns['Sim1'].memory.worker_count = {
//    min_harvesters: 0,
//    min_builders: 0,
//    min_upgraders: 0,
//    min_miners: 0,
//    min_janitors: 0,
//    min_transporters: 0,
//    min_tower_fillers: 0,
//    min_linkers: 0,
//    min_upgrade_boosters: 0,
//    min_starters: 4
//}
//Game.spawns['Sim1'].memory.fighter_count = {
//    min_attackers: 0,
//    min_scouts: 0,
//    min_reservers: 0
//};
//Game.spawns['Sim2'].memory.worker_count = {
//    min_harvesters: 1,
//    min_builders: 0,
//    min_upgraders: 0,
//    min_miners: 0,
//    min_janitors: 0,
//    min_transporters: 0,
//    min_tower_fillers: 0,
//    min_linkers: 0,
//    min_upgrade_boosters: 2,
//    min_starters: 0
//}
//Game.spawns['Sim2'].memory.fighter_count = {
//    min_attackers: 0,
//    min_scouts: 0,
//    min_reserver: 0
//};

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

    var scout_rooms = ['E62N33','E62N34','E63N33','E64N33'];
    var attack_rooms = ['E64N32'];
    //var attack_rooms = ['E62N33']
    //var attack_rooms = ['E63N34']
    var boost_room = 'E64N32';
    var claim_room = '';

    var defend_rooms = [];
    for (var city in Memory.city_suburbs) {
        var suburbs = Memory.city_suburbs[city];
        for (var i in suburbs) {
            defend_rooms.push(suburbs[i]);
        }
    }

    assignDefenders.run(defend_rooms);


    for (var city in Memory.cities) {
        console.log('City:',city);
        assignMiners.run(city);
        assignJanitors.run(city);
        assignTransporters.run(city);
        assignReservers.run(city);
        assignTowerFillers.run(city);
        assignStructLinks.run(city);

        createWorkers.run(city);
    }

    for (var i in Game.spawns) {
        var spawn = Game.spawns[i];
        var towers = getStructures.run([spawn.room],STRUCTURE_TOWER);
        var links = getStructures.run([spawn.room],STRUCTURE_LINK);
        
        createFighters.run(spawn);

        for (var i in towers) {
            var t_obj = Game.getObjectById(towers[i]);
            structTower.run(t_obj);
        }

        for (var i in links) {
            var l_obj = Game.getObjectById(links[i]);
            structLink.run(l_obj);
        }
    }


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
        } else if (creep.memory.role == 'starter') {
            roleStarter.run(creep);
        }

        if (creep.memory.role == 'scout') {
            if (scout_rooms[s_counter] != undefined) {                
                //if (Game.rooms[scout_rooms[s_counter]].controller.level == 0) {
                //    roleScout.moveToRoom(creep,scout_rooms[s_counter]);
                //    s_counter += 1;
                //}
                //console.log('Scouting:',scout_rooms[s_counter]);
                roleScout.moveToRoom(creep,scout_rooms[s_counter]);
                s_counter += 1;
            }
        } else if (creep.memory.role == 'reserver') {
            roleReserver.run(creep)
        } else if (creep.memory.role == 'attacker') {
            if (attack_rooms.length > 0) {
                roleAttacker.run(creep,attack_rooms[0]);
            }
        } else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep,claim_room);
        } else if (creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
    }
}