var roleMiner = require('role_miner');
var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleJanitor = require('role_janitor');
var roleDefender = require('role_defender');
var roleScout = require('role_scout');
var createWorkers = require('create_workers');
var createFighters = require('create_fighters');
var changeHome = require('change_home');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvs = 7;
    var builders = 1;
    var upgrades = 1;
    var janitors = 0;
    var miners = 2;
    var max_workers = 11;

    var attackers = 0;
    var scouts = 0;
    var max_fighters = 0;

    var spawn = Game.spawns['Spawn1'];

    createWorkers.run(spawn,harvs,builders,upgrades,janitors,miners,max_workers);
    createFighters.run(spawn,attackers,scouts,max_fighters);

    var towers = spawn.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER}})

    for (var t_obj in towers) {
        towerHeal.run(t_obj);
        towerAttack.run(t_obj);
    }

    //var tower = Game.getObjectById('ef358cdcd659a8dcaf66f81c');
    //if(tower) {
    //    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //        filter: (structure) => structure.hits < structure.hitsMax
    //    });
    //    if(closestDamagedStructure) {
    //        tower.repair(closestDamagedStructure);
    //    }
    //    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //    if(closestHostile) {
    //        tower.attack(closestHostile);
    //    }
    //}

    var room_sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    var counter = 1;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var source = room_sources[counter % room_sources.length];
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep,source);
            counter += 1;
        }
        if(creep.memory.role == 'harvester') {
            //roleHarvester.run(creep);
            roleHarvester.run(creep,source);
            counter += 1;
        }
        if(creep.memory.role == 'upgrader') {
            //roleUpgrader.run(creep);
            roleUpgrader.run(creep,source);
            counter += 1;
        }
        if(creep.memory.role == 'builder') {
            //roleBuilder.run(creep);
            roleBuilder.run(creep,source);
            counter += 1;
        }
        if(creep.memory.role == 'janitor') {
            roleJanitor.run(creep);
        }
    }
}