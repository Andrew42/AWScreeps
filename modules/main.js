var roleMiner = require('role_miner');
var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleJanitor = require('role_janitor');
var roleDefender = require('role_defender');
var roleScout = require('role_scout');
var createWorkers = require('create_workers');
var createFighters = require('create_fighters');
var structTower = require('struct_tower');
var changeHome = require('change_home');
var changeRole = require('change_role');
var assignMiners = require('assign_miners');

var roleRepairer = require('role_repairer');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //console.log('TEST1: ' + roleRepairer.add(3,4));
    //console.log('TEST2: ' + roleRepairer.sub(3,4));

    var avail_rooms = Game.rooms;
    assignMiners.run(avail_rooms);

    var const_sites = Game.constructionSites;
    for (i in const_sites) {
        site = const_sites[i];
        //console.log('Site: ',site.id);
    }
    //console.log('Num. Sites: ',const_sites.length);

    var harvs = 3;
    var builders = 0;
    var upgraders = 4;
    var janitors = 0;
    var miners = 2;
    var max_workers = 9;

    var attackers = 0;
    var scouts = 1;
    var max_fighters = 1;

    var spawn = Game.spawns['Spawn1'];

    createWorkers.run(spawn,harvs,builders,upgraders,janitors,miners,max_workers);
    createFighters.run(spawn,attackers,scouts,max_fighters);

    var towers = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER}})

    for (var i in towers) {
        var t_obj = towers[i];
        structTower.heal(t_obj);
        structTower.attack(t_obj);
    }

    var scout_room = 'E62N34';

    var room_sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    var counter = 1;
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var source = room_sources[counter % room_sources.length];
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep,source);
            counter += 1;
            continue;
        } else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'janitor') {
            roleJanitor.run(creep);
        }

        if (creep.memory.role == 'scout' && scout_room != undefined) {
            roleScout.moveToRoom(creep,scout_room);
        }
    }
}