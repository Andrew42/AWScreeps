var changeRole = require('change_role');

var createWorkers = {
    /** @param {Creep} creep **/
    run: function(spawn,harvesters,builders,upgraders,janitors,miners,max_creeps) {
        var min_harvesters = harvesters;
        var min_builders = builders;
        var min_upgraders = upgraders;
        var min_janitors = janitors;
        var min_miners = miners;

        var max_harvesters = harvesters;
        var max_builders = builders;
        var max_upgraders = upgraders;
        var max_janitors = janitors;
        var max_miners = miners;

        var max_total_creeps = max_creeps

        var worker_template    = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
        var harvester_template = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        var miner_template     = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var janitors = _.filter(Game.creeps, (creep) => creep.memory.role == 'janitor');
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

        var curr_total_creeps = harvesters.length + builders.length + upgraders.length + janitors.length + miners.length;
        var curr_room_name = spawn.room.name

        console.log('');
        if (curr_total_creeps != max_total_creeps) {
            console.log('Harvesters: ' + harvesters.length + '/' + min_harvesters);
            console.log('Builders: ' + builders.length + '/' + min_builders);
            console.log('Upgraders: ' + upgraders.length + '/' + min_upgraders);
            console.log('Janitors: ' + janitors.length + '/' + min_janitors);
            console.log('Miners: ' + miners.length + '/' + min_miners);
        }
        console.log('Total Worker Creeps: ' + curr_total_creeps + '/' + max_total_creeps);

        if (harvesters.length < min_harvesters && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(harvester_template,undefined,{role: 'harvester', home: curr_room_name});
            console.log('Spawning new harvester: ' + newName);
            //return;
        }

        if (builders.length < min_builders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(worker_template, undefined, {role: 'builder', home: curr_room_name});
            console.log('Spawning new builder: ' + newName);
            return;
        } else if (builders.length > max_builders && upgraders.length < min_upgraders) {
            changeRole.run(builders[0],'upgrader');
        } else if (builders.length > max_builders && janitors.length < min_janitors) {
            changeRole.run(builders[0],'janitor');
        }

        if (upgraders.length < min_upgraders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(worker_template, undefined, {role: 'upgrader', home: curr_room_name});
            console.log('Spawning new upgrader: ' + newName);
            return;
        } else if (upgraders.length > max_upgraders && janitors.length < min_janitors) {
            changeRole.run(upgraders[0],'janitor');
        } else if (upgraders.length > max_upgraders && builders.length < min_builders) {
            changeRole.run(upgraders[0],'builder');
        }

        if (janitors.length < min_janitors && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(worker_template, undefined, {role: 'janitor', home: curr_room_name});
            console.log('Spawning new janitor: ' + newName);
            return;
        } else if(janitors.length > max_janitors && builders.length < min_builders) {
            changeRole.run(janitors[0],'builder');
        } else if(janitors.length > max_janitors && upgraders.length < min_upgraders) {
            changeRole.run(janitors[0],'upgrader');
        }

        //if (harvesters.length < min_harvesters && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
        //    var newName = spawn.createCreep(worker_template, undefined, {role: 'harvester', home: curr_room_name});
        //    console.log('Spawning new harvester: ' + newName);
        //} else if (harvesters.length > max_harvesters && builders.length < min_builders) {
        //    changeRole.run(harvesters[0],'builder');
        //} else if (harvesters.length > max_harvesters && upgraders.length < min_upgraders) {
        //    changeRole.run(harvesters[0],'upgrader');
        //} else if (harvesters.length > max_harvesters && janitors.length < min_janitors) {
        //    changeRole.run(harvesters[0],'janitor');
        //}

        //if (builders.length < min_builders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
        //    var newName = spawn.createCreep(worker_template, undefined, {role: 'builder', home: curr_room_name});
        //    console.log('Spawning new builder: ' + newName);
        //} else if (builders.length > max_builders && upgraders.length < min_upgraders) {
        //    changeRole.run(builders[0],'upgrader');
        //} else if (builders.length > max_builders && janitors.length < min_janitors) {
        //    changeRole.run(builders[0],'janitor');
        //} else if (builders.length > max_builders && harvesters.length < min_harvesters) {
        //    changeRole.run(builders[0],'harvester');
        //}

        //if (upgraders.length < min_upgraders && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
        //    var newName = spawn.createCreep(worker_template, undefined, {role: 'upgrader', home: curr_room_name});
        //    console.log('Spawning new upgrader: ' + newName);
        //} else if (upgraders.length > max_upgraders && janitors.length < min_janitors) {
        //    changeRole.run(upgraders[0],'janitor');
        //} else if (upgraders.length > max_upgraders && harvesters.length < min_harvesters) {
        //    changeRole.run(upgraders[0],'harvester');
        //} else if (upgraders.length > max_upgraders && builders.length < min_builders) {
        //    changeRole.run(upgraders[0],'builder');
        //}

        //if (janitors.length < min_janitors && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
        //    var newName = spawn.createCreep(worker_template, undefined, {role: 'janitor', home: curr_room_name});
        //    console.log('Spawning new janitor: ' + newName);
        //} else if(janitors.length > max_janitors && harvesters.length < min_harvesters) {
        //    changeRole.run(janitors[0],'harvester');
        //} else if(janitors.length > max_janitors && builders.length < min_builders) {
        //    changeRole.run(janitors[0],'builder');
        //} else if(janitors.length > max_janitors && upgraders.length < min_upgraders) {
        //    changeRole.run(janitors[0],'upgrader');
        //}

        if (miners.length < min_miners && spawn.energy >= 300 && curr_total_creeps < max_total_creeps) {
            var newName = spawn.createCreep(miner_template, undefined, {role: 'miner', home: curr_room_name, assigned_source: undefined});
            console.log('Spawning new miner: ' + newName);
        }
    }
};

module.exports = createWorkers;