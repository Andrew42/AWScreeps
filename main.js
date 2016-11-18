var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleJanitor = require('role_janitor');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var min_harvesters = 3
    var min_builders = 3
    var min_upgraders = 2
    var min_janitors = 0

    var max_harvesters = 3
    var max_builders = 3
    var max_upgraders = 2
    var max_janitors = 0

    var max_total_creeps = 8

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var janitors = _.filter(Game.creeps, (creep) => creep.memory.role == 'janitor');

    var curr_total_creeps = harvesters.length + builders.length + upgraders.length + janitors.length

    var room_sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    var num_sources = room_sources.length

    console.log('');
    console.log('Harvesters: ' + harvesters.length);
    console.log('Builders: ' + builders.length);
    console.log('Upgraders: ' + upgraders.length);
    console.log('Janitors: ' + janitors.length);
    console.log('Total Creeps: ' + curr_total_creeps);

    if(harvesters.length < min_harvesters && Game.spawns['Spawn1'].energy >= 300 && curr_total_creeps < max_total_creeps) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    } else if(harvesters.length > max_harvesters && builders.length < min_builders) {
        harvesters[0].say('to builder');
        harvesters[0].memory.role = 'builder';
    } else if(harvesters.length > max_harvesters && upgraders.length < min_upgraders) {
        harvesters[0].say('to upgrader');
        harvesters[0].memory.role = 'upgrader';
    } else if(harvesters.length > max_harvesters && janitors.length < min_janitors) {
        harvesters[0].say('to janitor');
        harvesters[0].memory.role = 'janitor';
    }

    if(builders.length < min_builders && Game.spawns['Spawn1'].energy >= 300 && curr_total_creeps < max_total_creeps) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    } else if(builders.length > max_builders && upgraders.length < min_upgraders) {
        builders[0].say('to upgrader');
        builders[0].memory.role = 'upgrader';
    } else if(builders.length > max_builders && janitors.length < min_janitors) {
        builders[0].say('to janitor');
        builders[0].memory.role = 'janitor';
    } else if(builders.length > max_builders && harvesters.length < min_harvesters) {
        builders[0].say('to harvester');
        builders[0].memory.role = 'harvester';
    }

    if(upgraders.length < min_upgraders && Game.spawns['Spawn1'].energy >= 300 && curr_total_creeps < max_total_creeps) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    } else if(upgraders.length > max_upgraders && janitors.length < min_janitors) {
        upgraders[0].say('to janitor');
        upgraders[0].memory.role = 'janitor';
    } else if(upgraders.length > max_upgraders && harvesters.length < min_harvesters) {
        upgraders[0].say('to harvester');
        upgraders[0].memory.role = 'harvester';
    } else if(upgraders.length > max_upgraders && builders.length < min_builders) {
        upgraders[0].say('to builder');
        upgraders[0].memory.role = 'builder';
    }

    if(janitors.length < min_janitors && Game.spawns['Spawn1'].energy >= 300 && curr_total_creeps < max_total_creeps) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'janitor'});
        console.log('Spawning new upgrader: ' + newName);
    } else if(janitors.length > max_janitors && harvesters.length < min_harvesters) {
        janitors[0].say('to harvester');
        janitors[0].memory.role = 'harvester';
    } else if(janitors.length > max_janitors && builders.length < min_builders) {
        janitors[0].say('to builder');
        janitors[0].memory.role = 'builder';
    } else if(janitors.length > max_janitors && upgraders.length < min_upgraders) {
        janitors[0].say('to upgrader');
        janitors[0].memory.role = 'upgrader';
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

    var counter = 1;
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
        if(creep.memory.role == 'janitor') {
            roleJanitor.run(creep);
        }
    }
}