var roleJanitor = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name != creep.memory.assigned_room) {
            creep.say('going home');
            creep.moveTo(new RoomPosition(25, 25, creep.memory.assigned_room));
            return;
        }

        if(!creep.memory.cleaning && creep.carry.energy == 0) {
            creep.memory.cleaning = true;
            creep.memory.repairing = false;
            creep.say('cleaning');
        } else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.cleaning = false;
            creep.memory.repairing = false;
        }

        if(!creep.memory.cleaning) {
            var repair_tars = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (repair_tars.length > 0) {
                creep.say('repairing');
                creep.memory.repairing = true;
            } else {
                creep.memory.repairing = false;
            }
        }

        if (creep.memory.repairing && creep.carry.energy > 0) {
            this.repair(creep);
        } else {
            var roomContainers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
            });
            var fullestContainer = roomContainers[0];
            for (var i in roomContainers) {
                var tar = roomContainers[i];
                var tar_dist = creep.pos.getRangeTo(tar);
                var full_dist = creep.pos.getRangeTo(fullestContainer);
                if (tar.store[RESOURCE_ENERGY]/tar_dist > fullestContainer.store[RESOURCE_ENERGY]/full_dist) {
                    fullestContainer = tar;
                }
            }
            if (creep.withdraw(fullestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(fullestContainer);
            }
        }
    },

    repair: function(creep) {
        var wall_cut = 75000;
        var rampart_cut = 75000;
        var plain_cut = 2000;
        var swamp_cut = 10000;
        var damagedStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        var heal_tar = undefined;
        for (var i in damagedStructures) {
            var struct = damagedStructures[i];
            if (struct.structureType == STRUCTURE_WALL) {
                if (struct.hits < wall_cut) {
                    heal_tar = struct;
                    break;
                }
            } else if (struct.structureType == STRUCTURE_RAMPART) {
                if (struct.hits < rampart_cut) {
                    heal_tar = struct;
                    break;
                }
            } else if (struct.structureType == STRUCTURE_ROAD && Game.map.getTerrainAt(struct.pos) == 'plain') {
                if (struct.hits < plain_cut) {
                    heal_tar = struct;
                    break;
                }
            } else if (struct.structureType == STRUCTURE_ROAD && Game.map.getTerrainAt(struct.pos) == 'swamp') {
                if (struct.hits < swamp_cut) {
                    heal_tar = struct;
                    break;
                }
            } else {
                heal_tar = struct;
                break;
            }
        }

        if (heal_tar == undefined) {
            return;
        } else {
            if (creep.repair(heal_tar) == ERR_NOT_IN_RANGE) {
                creep.moveTo(heal_tar);
            }
        }
    }
};

module.exports = roleJanitor;