var changeRole = require('change_role');

var createWorkers = {
    /** @param {Creep} creep **/
    run: function(spawn,harvesters,builders,upgraders,janitors,max_creeps) {
        //var min_harvesters = 3
        //var min_builders = 5
        //var min_upgraders = 1
        //var min_janitors = 0
        //var max_harvesters = 3
        //var max_builders = 5
        //var max_upgraders = 1
        //var max_janitors = 0

        var min_harvesters = harvesters;
        var min_builders = builders;
        var min_upgraders = upgraders;
        var min_janitors = janitors;

        var max_harvesters = harvesters;
        var max_builders = builders;
        var max_upgraders = upgraders;
        var max_janitors = janitors;

        var max_total_creeps = max_creeps

        var worker_template = [WORK,WORK,CARRY,MOVE,MOVE];

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var janitors = _.filter(Game.creeps, (creep) => creep.memory.role == 'janitor');

        var curr_total_creeps = harvesters.length + builders.length + upgraders.length + janitors.length
        var curr_room_name = spawn.room.name

        console.log('');
        console.log('Harvesters: ' + harvesters.length);
        console.log('Builders: ' + builders.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Janitors: ' + janitors.length);
        console.log('Total Worker Creeps: ' + curr_total_creeps);

        if(harvesters.length < min_harvesters && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(worker_template, undefined, {role: 'harvester','home': curr_room_name});
            console.log('Spawning new harvester: ' + newName);
        } else if(harvesters.length > max_harvesters && builders.length < min_builders) {
            changeRole.run(harvesters[0],'builder');
            //harvesters[0].say('to builder');
            //harvesters[0].memory.role = 'builder';
        } else if(harvesters.length > max_harvesters && upgraders.length < min_upgraders) {
            changeRole.run(harvesters[0],'upgrader');
            //harvesters[0].say('to upgrader');
            //harvesters[0].memory.role = 'upgrader';
        } else if(harvesters.length > max_harvesters && janitors.length < min_janitors) {
            changeRole.run(harvesters[0],'janitor');
            //harvesters[0].say('to janitor');
            //harvesters[0].memory.role = 'janitor';
        }

        if(builders.length < min_builders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(worker_template, undefined, {role: 'builder','home': curr_room_name});
            console.log('Spawning new builder: ' + newName);
        } else if(builders.length > max_builders && upgraders.length < min_upgraders) {
            changeRole.run(builders[0],'upgrader');
            //builders[0].say('to upgrader');
            //builders[0].memory.role = 'upgrader';
        } else if(builders.length > max_builders && janitors.length < min_janitors) {
            changeRole.run(builders[0],'janitor');
            //builders[0].say('to janitor');
            //builders[0].memory.role = 'janitor';
        } else if(builders.length > max_builders && harvesters.length < min_harvesters) {
            changeRole.run(builders[0],'harvester');
            //builders[0].say('to harvester');
            //builders[0].memory.role = 'harvester';
        }

        if(upgraders.length < min_upgraders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(worker_template, undefined, {role: 'upgrader','home': curr_room_name});
            console.log('Spawning new upgrader: ' + newName);
        } else if(upgraders.length > max_upgraders && janitors.length < min_janitors) {
            changeRole.run(upgraders[0],'janitor');
            //upgraders[0].say('to janitor');
            //upgraders[0].memory.role = 'janitor';
        } else if(upgraders.length > max_upgraders && harvesters.length < min_harvesters) {
            changeRole.run(upgraders[0],'harvester');
            //upgraders[0].say('to harvester');
            //upgraders[0].memory.role = 'harvester';
        } else if(upgraders.length > max_upgraders && builders.length < min_builders) {
            changeRole.run(upgraders[0],'builder');
            //upgraders[0].say('to builder');
            //upgraders[0].memory.role = 'builder';
        }

        if(janitors.length < min_janitors && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(worker_template, undefined, {role: 'janitor','home': curr_room_name});
            console.log('Spawning new janitor: ' + newName);
        } else if(janitors.length > max_janitors && harvesters.length < min_harvesters) {
            changeRole.run(janitors[0],'harvester');
            //janitors[0].say('to harvester');
            //janitors[0].memory.role = 'harvester';
        } else if(janitors.length > max_janitors && builders.length < min_builders) {
            changeRole.run(janitors[0],'builder');
            //janitors[0].say('to builder');
            //janitors[0].memory.role = 'builder';
        } else if(janitors.length > max_janitors && upgraders.length < min_upgraders) {
            changeRole.run(janitors[0],'upgrader');
            //janitors[0].say('to upgrader');
            //janitors[0].memory.role = 'upgrader';
        }
    }
};

module.exports = createWorkers;