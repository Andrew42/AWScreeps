var creep_templates = {
    rcl_1: {//MAX: 300
        'harvester':[
            /*NONE*/
        ],
        'janitor':[
            /*NONE*/
        ],
        'linker':[
            /*NONE*/
        ],
        'tower_filler':[
            /*NONE*/
        ],
        'miner':[
            /*NONE*/
        ],
        'builder':[
            /*NONE*/
        ],
        'transporter':[
            /*NONE*/
        ],
        'starter':[
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[
            /*NONE*/
        ],
        'upgrade_booster':[
            /*NONE*/
        ]
    },
    rcl_2: {//MAX: 550
        'harvester':[//450
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE
        ],
        'janitor':[
            /*NONE*/
        ],
        'linker':[
            /*NONE*/
        ],
        'tower_filler':[
            /*NONE*/
        ],
        'miner':[//550
            WORK,WORK,WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'builder':[
            /*NONE*/
        ],
        'transporter':[
            /*NONE*/
        ],
        'starter':[
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[
            /*NONE*/
        ],
        'upgrade_booster':[
            /*NONE*/
        ],
        'reserver': [
            /*NONE*/
        ]
    },
    rcl_3: {//MAX: 800
        'harvester':[//600
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'janitor':[//650
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'linker':[
            /*NONE*/
        ],
        'tower_filler':[//600
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'miner':[//750
            WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE
        ],
        'builder':[//750
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'transporter':[//600
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'starter':[//300
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[//800
            WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'upgrade_booster':[
            /*NONE*/
        ],
        'reserver': [
            /*NONE*/
        ]
    },
    rcl_4: {//MAX: 1300
        'harvester':[//900
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE
        ],
        'janitor':[//800
            WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'linker':[
            /*NONE*/
        ],
        'tower_filler':[//600
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'miner':[//850
            WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE
        ],
        'builder':[//1050
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE
        ],
        'transporter':[//1050
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE
        ],
        'starter':[//300
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[//1100
            WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
        ],
        'upgrade_booster':[//0
            /*NONE*/
        ],
        'reserver': [//1250
            CLAIM,CLAIM,
            MOVE
        ]
    },
    rcl_5: {//MAX: 1800
        'harvester':[//1050
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE
        ],
        'janitor':[//800
            WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'linker':[//150
            CARRY,CARRY,
            MOVE
        ],
        'tower_filler':[//600
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'miner':[//850
            WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE
        ],
        'builder':[//1050
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
        ],
        'transporter':[//1800
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE
        ],
        'starter':[//300
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[//1300
            WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE
        ],
        'upgrade_booster':[//0
            /*NONE*/
        ],
        'reserver': [//1250
            CLAIM,CLAIM,
            MOVE
        ]
    },
    rcl_6: {//MAX: 2300
        'harvester':[//1200
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE
        ],
        'janitor':[//800
            WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'linker':[//150
            CARRY,CARRY,
            MOVE
        ],
        'tower_filler':[//750
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE
        ],
        'miner':[//850
            WORK,WORK,WORK,WORK,WORK,
            WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE
        ],
        'builder':[//1050
            WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE
        ],
        'transporter':[//1800
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE
        ],
        'starter':[//300
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[//1800
            WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE
        ],
        'upgrade_booster':[//1400
            WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE
        ],
        'transport_booster':[//1250
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE
        ],
        'miner_booster':[
            WORK,WORK,WORK,WORK,WORK,
            WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ],
        'reserver': [//1250
            CLAIM,CLAIM,
            MOVE
        ]
    },
    rcl_7: {//MAX: 5300
        'harvester':[//1200
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE
        ],
        'janitor':[
            /*NONE*/
        ],
        'linker':[
            /*NONE*/
        ],
        'tower_filler':[
            /*NONE*/
        ],
        'miner':[
            /*NONE*/
        ],
        'builder':[
            /*NONE*/
        ],
        'transporter':[
            /*NONE*/
        ],
        'starter':[
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[
            /*NONE*/
        ],
        'upgrade_booster':[//1400
            WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE
        ],
        'transport_booster':[//1250
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE
        ],
        'miner_booster':[
            WORK,WORK,WORK,WORK,WORK,
            WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ]
    },
    rcl_8: {//MAX: 12300
        'harvester':[//1200
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE
        ],
        'janitor':[
            /*NONE*/
        ],
        'linker':[
            /*NONE*/
        ],
        'tower_filler':[
            /*NONE*/
        ],
        'miner':[
            /*NONE*/
        ],
        'builder':[
            /*NONE*/
        ],
        'transporter':[
            /*NONE*/
        ],
        'starter':[
            WORK,
            CARRY,CARRY,
            MOVE,MOVE
        ],
        'upgrader':[
            /*NONE*/
        ],
        'upgrade_booster':[//1400
            WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE
        ],
        'transport_booster':[//1250
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE
        ],
        'miner_booster':[
            WORK,WORK,WORK,WORK,WORK,
            WORK,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE
        ]
    }
}

var createWorkers = {
    /** @param {Creep} creep **/
    run: function(city) {
        var creation_map = {
            'harvester':         this.createHarvester,
            'builder':           this.createBuilder,
            'upgrader':          this.createUpgrader,
            'miner':             this.createMiner,
            'janitor':           this.createJanitor,
            'transporter':       this.createTransporter,
            'tower_filler':      this.createTowerFiller,
            'linker':            this.createLinker,
            'upgrade_booster':   this.createUpgradeBooster,
            'transport_booster': this.createTransportBooster,
            'miner_booster':     this.createMinerBooster,
            'starter':           this.createStarter,
            'reserver':          this.createReserver
        };

        var print_map = {
            'harvester':         'harvest   ',
            'builder':           'builder   ',
            'upgrader':          'upgrader  ',
            'miner':             'miner     ',
            'janitor':           'janitor   ',
            'transporter':       't_porter  ',
            'tower_filler':      't_filler  ',
            'linker':            'linker    ',
            'upgrade_booster':   'u_booster ',
            'transport_booster': 't_booster ',
            'miner_booster':     'm_booster ',
            'starter':           'starter   ',
            'reserver':          'reserver  '
        };

        var rcl_map = {
            1: 'rcl_1',
            2: 'rcl_2',
            3: 'rcl_3',
            4: 'rcl_4',
            5: 'rcl_5',
            6: 'rcl_6',
            7: 'rcl_7',
            8: 'rcl_8'
        };

        var capacity_map = {
            1: 300,
            2: 550,
            3: 800,
            4: 1300,
            5: 1800,
            6: 2300,
            7: 5300,
            8: 12300
        }

        var room = Game.rooms[city];
        var rcl = rcl_map[room.controller.level];
        if (room.energyCapacityAvailable < capacity_map[room.controller.level]) {
            rcl = rcl_map[room.controller.level - 1];
        }

        console.log('Current RCL:',rcl);

        var template_map = creep_templates[rcl];

        var needed_workers = Memory.cities[city].worker_count;
        var current_workers = {}
        var curr_total = 0;
        var needed_total = _.sum(needed_workers);
        for (var role in needed_workers) {
            var creep_list = _.filter(Game.creeps, (creep) => (creep.memory.role == role && city == creep.memory.home && !creep.memory.is_zombie));
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
                    var template = template_map[role];
                    if (template.length == 0) {
                        continue;
                    }
                    creation_map[role](tmp_spawn,current_workers[role],template);
                    current_workers[role] += 1;
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

    createHarvester: function(spawn,current_amount,template) {
        console.log('\tCreating new harvester!');
        var newName = spawn.createCreep(template,undefined,{
            role: 'harvester',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
        if (newName == ERR_NOT_ENOUGH_ENERGY && current_amount == 0) {
            newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined,{
                role: 'harvester',
                home: spawn.room.name,
                spawn_id: spawn.id,
                is_zombie: false
            });
        }
    },

    createStarter: function(spawn,current_amount,template) {
        console.log('\tCreating new starter!');
        var newName = spawn.createCreep(template, undefined, {
            role: 'starter',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
    },

    createMiner: function(spawn,current_amount,template) {
        console.log('\tCreating new miner!');
        var newName = spawn.createCreep(template, undefined, {
            role: 'miner',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false,
            assigned_source: undefined
        });
    },

    createLinker: function(spawn,current_amount,template) {
        console.log('\tCreating new linker!');
        var newName = spawn.createCreep(template, undefined, {
            role: 'linker',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
    },

    createTransporter: function(spawn,current_amount,template) {
        console.log('\tCreating new transporter!');
        var newName = spawn.createCreep(template, undefined, {
            role: 'transporter',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false,
            assigned_container: undefined,
            assigned_storage: spawn.room.storage.id,
            path_index: 0,
            on_path: false,
            at_head: false,
            at_tail: false,
            assigned_path: []
        });
    },

    createTowerFiller: function(spawn,current_amount,template) {
        console.log('\tCreating new tower filler!');
        var newName = spawn.createCreep(template,undefined, {
            role: 'tower_filler',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false,
            assigned_room: undefined
        });
    },

    createJanitor: function(spawn,current_amount,template) {
        console.log('\tCreating new janitor');
        var newName = spawn.createCreep(template, undefined, {
            role: 'janitor',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false,
            assigned_room: undefined
        });
    },

    createBuilder: function(spawn,current_amount,template) {
        console.log('\tCreating new builder');
        var newName = spawn.createCreep(template, undefined, {
            role: 'builder',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
    },

    createUpgrader: function(spawn,current_amount,template) {
        console.log('\tCreating new upgader');
        var newName = spawn.createCreep(template, undefined, {
            role: 'upgrader',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
    },

    createUpgradeBooster: function(spawn,current_amount,template) {
        console.log('\tCreating new booster!');
        var newName = spawn.createCreep(template,undefined, {
            role: 'upgrade_booster',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
    },

    createReserver: function(spawn,current_amount,template) {
        console.log('\tCreate new reserver!');
        var newName = spawn.createCreep(template, undefined, {
            role: 'reserver',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false,
            assigned_room: undefined
        });
    },

    createTransportBooster: function(spawn,current_amount,template) {
        console.log('\tCreating new booster!');
        var newName = spawn.createCreep(template,undefined, {
            role: 'transport_booster',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
    },

    createMinerBooster: function(spawn,current_amount,template) {
        console.log('\tCreating new booster!');
        var newName = spawn.createCreep(template,undefined, {
            role: 'miner_booster',
            home: spawn.room.name,
            spawn_id: spawn.id,
            is_zombie: false
        });
    }
};

module.exports = createWorkers;