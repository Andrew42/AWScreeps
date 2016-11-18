var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleJanitor = require('role_janitor');
var roleDefender = require('role_defender');
var roleScout = require('role_scout');
var createWorkers = require('create_workers');
var changeHome = require('change_home');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    harv = 3;
    builders = 5;
    upgrade = 1;
    janitor = 0;
    max_workers = 9;

    createWorkers.run(Game.spawns['Spawn1'],harv,builders,upgrade,janitor,max_workers);

    var tower = Game.getObjectById('ef358cdcd659a8dcaf66f81c');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    var room_sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    var counter = 1;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var source = room_sources[counter % room_sources.length];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep,source);
            counter += 1;
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep,source);
            counter += 1;
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep,source);
            counter += 1;
        }
        if(creep.memory.role == 'janitor') {
            roleJanitor.run(creep);
        }
    }
}