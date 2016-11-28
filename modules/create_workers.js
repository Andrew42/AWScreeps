// 850
var miner_template     = [
    WORK,WORK,WORK,WORK,WORK,WORK,
    CARRY,CARRY,MOVE,
    MOVE,MOVE
];
// 1300
var upgrader_template  = [
    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
];
// 800
var builder_template   = [
    WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
];
// 650
var janitor_template   = [
    WORK,WORK,WORK,
    CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE
];
// 600
var harvester_template = [
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE
];
// 1200
var transporter_template = [
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
];
// 600
var tower_filler_template = [
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE
];
// 150
var linker_template = [
    CARRY,CARRY,
    MOVE
];
// 1200
var upgrade_booster_template = [
    WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
];
// 300
var starter_template = [
    WORK,WORK,WORK,
    CARRY,CARRY,
    MOVE,MOVE,MOVE
];


var createWorkers = {
    /** @param {Creep} creep **/
    run: function(city) {
        var creation_map = {
            'harvester':       this.createHarvester,
            'builder':         this.createBuilder,
            'upgrader':        this.createUpgrader,
            'miner':           this.createMiner,
            'janitor':         this.createJanitor,
            'transporter':     this.createTransporter,
            'tower_filler':    this.createTowerFiller,
            'linker':          this.createLinker,
            'upgrade_booster': this.createUpgradeBooster,
            'starter':         this.createStarter
        }

        var print_map = {
            'harvester':       'harvest ',
            'builder':         'builder ',
            'upgrader':        'upgrader',
            'miner':           'miner   ',
            'janitor':         'janitor ',
            'transporter':     't_porter',
            'tower_filler':    't_filler',
            'linker':          'linker  ',
            'upgrade_booster': 'booster ',
            'starter':         'starter ',
        }

        var needed_workers = Memory.cities[city].worker_count;
        var current_workers = {}
        var curr_total = 0;
        var needed_total = _.sum(needed_workers);
        for (var role in needed_workers) {
            var creep_list = _.filter(Game.creeps, (creep) => (creep.memory.role == role && city == creep.memory.home));
            current_workers[role] = creep_list.length;
            curr_total += creep_list.length;
        }

        var spawns = Game.rooms[city].find(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });

        for (var i in spawns) {
            var tmp_spawn = spawns[i];
            if (tmp_spawn.spawning != null) {
                continue;
            }
            for (var j in Memory.all_roles) {
                var role = Memory.all_roles[j];
                if (current_workers[role] < needed_workers[role]) {
                    creation_map[role](tmp_spawn,current_workers[role]);
                    break;
                }
            }
        }

        var counter = 0;
        var print_str = "\t"
        for (var role in needed_workers) {
            print_str += print_map[role]+': '+current_workers[role]+'/'+needed_workers[role]+'\t';
            if (counter % 2 == 1) {
                console.log(print_str);
                print_str = "\t"
            }
            counter += 1;
        }
        console.log('\tTotal worker creeps:',curr_total+'/'+needed_total);
    },

    createHarvester: function(spawn,current_amount) {
        console.log('\tCreating new harvester!');
        var newName = spawn.createCreep(harvester_template,undefined,{
            role: 'harvester',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
        if (newName == ERR_NOT_ENOUGH_ENERGY && current_amount == 0) {
            newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined,{
                role: 'harvester',
                home: spawn.room.name,
                spawn_id: spawn.id
            });
        }
    },

    createStarter: function(spawn,current_amount) {
        console.log('\tCreating new starter!');
        var newName = spawn.createCreep(starter_template, undefined, {
            role: 'starter',
            home: spawn.room.name,
            spawn_id: spawn.id,
        });
    },

    createMiner: function(spawn,current_amount) {
        console.log('\tCreating new miner!');
        var newName = spawn.createCreep(miner_template, undefined, {
            role: 'miner',
            home: spawn.room.name,
            spawn_id: spawn.id,
            assigned_source: undefined
        });
    },

    createLinker: function(spawn,current_amount) {
        console.log('\tCreating new linker!');
        var newName = spawn.createCreep(linker_template, undefined, {
            role: 'linker',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
    },

    createTransporter: function(spawn,current_amount) {
        console.log('\tCreating new transporter!');
        var newName = spawn.createCreep(transporter_template, undefined, {
            role: 'transporter',
            home: spawn.room.name,
            spawn_id: spawn.id,
            assigned_container: undefined,
            assigned_storage: spawn.room.storage.id,
            path_index: 0,
            on_path: false,
            at_head: false,
            at_tail: false,
            assigned_path: []
        });
    },

    createTowerFiller: function(spawn,current_amount) {
        console.log('\tCreating new tower filler!');
        var newName = spawn.createCreep(tower_filler_template,undefined, {
            role: 'tower_filler',
            home: spawn.room.name,
            spawn_id: spawn.id,
            assigned_room: undefined
        });
    },

    createJanitor: function(spawn,current_amount) {
        console.log('\tCreating new janitor');
        var newName = spawn.createCreep(janitor_template, undefined, {
            role: 'janitor',
            home: spawn.room.name,
            spawn_id: spawn.id,
            assigned_room: undefined
        });
    },

    createBuilder: function(spawn,current_amount) {
        console.log('\tCreating new builder');
        var newName = spawn.createCreep(builder_template, undefined, {
            role: 'builder',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
    },

    createUpgrader: function(spawn,current_amount) {
        console.log('\tCreating new upgader');
        var newName = spawn.createCreep(upgrader_template, undefined, {
            role: 'upgrader',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
    },

    createUpgradeBooster: function(spawn,current_amount) {
        console.log('\tCreating new booster!');
        var newName = spawn.createCreep(upgrade_booster_template,undefined, {
            role: 'upgrade_booster',
            home: spawn.room.name,
            spawn_id: spawn.id
        });
    }
};

module.exports = createWorkers;