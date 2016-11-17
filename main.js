var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var min_harvesters = 1
    var min_builders = 6
    var min_upgraders = 1

    var max_harvesters = 1
    var max_builders = 6
    var max_upgraders = 1

    var max_total_creeps = 8

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    var curr_total_creeps = harvesters.length + builders.length + upgraders.length

    var room_sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    var num_sources = room_sources.length

    console.log('Harvesters: ' + harvesters.length);
    console.log('Builder: ' + builders.length);
    console.log('Upgrader: ' + upgraders.length);
    console.log('Number of Sources: ' + room_sources.length);

    if(harvesters.length < min_harvesters && Game.spawns['Spawn1'].energy > 200 && curr_total_creeps < max_total_creeps) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    } else if(harvesters.length > max_harvesters && builders.length < min_builders) {
        harvesters[0].say('to builder');
        harvesters[0].memory.role = 'builder'
    } else if(harvesters.length > max_harvesters && upgraders.length < min_upgraders) {
        harvesters[0].say('to upgrader');
        harvesters[0].memory.role = 'upgrader'
    }

    if(builders.length < min_builders && Game.spawns['Spawn1'].energy > 200 && curr_total_creeps < max_total_creeps) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    } else if(builders.length > max_builders && builders.length < min_upgraders) {
        builders[0].say('to upgrader');
        builders[0].memory.role = 'upgrader'
    } else if(builders.length > max_builders && upgraders.length < min_harvesters) {
        builders[0].say('to harvester');
        builders[0].memory.role = 'harvester'
    }

    if(upgraders.length < min_upgraders && Game.spawns['Spawn1'].energy > 200 && curr_total_creeps < max_total_creeps) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    } else if(upgraders.length > max_upgraders && builders.length < min_harvesters) {
        upgraders[0].say('to harvester');
        upgraders[0].memory.role = 'harvester'
    } else if(upgraders.length > max_upgraders && upgraders.length < min_builders) {
        upgraders[0].say('to builder');
        upgraders[0].memory.role = 'builder'
    }

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

    var counter = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var source = room_sources[counter % num_sources];
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
    }
}