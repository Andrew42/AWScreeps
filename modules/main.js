var roleMiner = require('role_miner');
var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleJanitor = require('role_janitor');
var roleScout = require('role_scout');
var roleTransporter = require('role_transporter');
var roleClaimer = require('role_claimer');
var createWorkers = require('create_workers');
var createFighters = require('create_fighters');
var structTower = require('struct_tower');
var assignMiners = require('assign_miners');
var assignJanitors = require('assign_janitors');
var assignTransporters = require('assign_transporters');
var getStructures = require('get_structures');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var avail_rooms = Game.rooms;
    var spawn = Game.spawns['Spawn1'];
    var towers = getStructures.run([spawn.room],STRUCTURE_TOWER);

    //var harvs = 3;
    //var builders = 2;
    //var upgraders = 1;
    //var janitors = 0;
    //var miners = 2;
    //var max_workers = 10;

    var harvs = 2;
    var builders = 1;
    var upgraders = 4;
    var janitors = 0;
    var miners = 3;
    var transporters = 6;
    var max_workers = 16;

    var attackers = 0;
    var scouts = 1;
    var claimers = 0;
    var max_fighters = 1;

    assignMiners.run(avail_rooms);
    assignJanitors.run(avail_rooms);
    assignTransporters.run(avail_rooms);

    createWorkers.run(spawn,harvs,builders,upgraders,janitors,miners,transporters,max_workers);
    createFighters.run(spawn,attackers,scouts,claimers,max_fighters);

    //var storages = getStructures.run([spawn.room],STRUCTURE_STORAGE);
    //var containers = getStructures.run([spawn.room],STRUCTURE_CONTAINER);
    //for (var i in containers) {
    //    struct = Game.getObjectById(containers[i]);
    //    console.log('Struct: ',struct.structureType);
    //}
    for (var i in towers) {
        var t_obj = Game.getObjectById(towers[i]);
        structTower.run(t_obj);
        //structTower.attack(t_obj);
        //structTower.heal(t_obj);
    }

    //var scout_room = 'E63N34';  // HOME!
    var scout_room = 'E62N34';
    //var scout_room = 'E61N34';
    //var scout_room = 'E63N33';

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive < 16 && creep.carry.energy == 0) {
            //creep.say('SUDOKU');
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
        }

        if (creep.memory.role == 'scout' && scout_room != undefined) {
            roleScout.moveToRoom(creep,scout_room);
        } else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep,claim_room)
        }
    }
}