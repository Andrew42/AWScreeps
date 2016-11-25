var roleJanitor = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name != creep.memory.assigned_room) {
            creep.say('going home');
            if (creep.memory.assigned_room == undefined) {
                return;
            }
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
            if (creep.memory.repair_to_perc) {
                this.repairToPerc(creep,creep.memory.repair_cap,creep.memory.repair_target_id);
            } else if (creep.memory.repair_to_val) {
                this.repairToVal(creep,creep.memory.repair_cap,creep.memory.repair_target_id);
            } else {
                this.repair(creep);
            }
        } else if (creep.room.storage != undefined) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
            }
        } else {
            var dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (res) => {
                    return res.amount > 50;
                }
            });

            if (dropped_resources.length > 0) {
                if (dropped_resources.length > 0) {
                    if(creep.pickup(dropped_resources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped_resources[0])
                    }
                }
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
        }
    },

    repair: function(creep) {
        var wall_cut = 125000;
        var rampart_cut = 160000;
        var plain_cut = 1250;
        var swamp_cut = 7500;
        var container_cut = 100000;
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
                    creep.memory.repair_to_val = true;
                    creep.memory.repair_cap = 175000;
                    creep.memory.repair_target_id = struct.id;
                    heal_tar = struct;
                    break;
                }
            } else if (struct.structureType == STRUCTURE_ROAD && Game.map.getTerrainAt(struct.pos) == 'plain') {
                if (struct.hits < plain_cut) {
                    heal_tar = struct;
                    creep.memory.repair_to_perc = true;
                    creep.memory.repair_cap = 1.0;
                    creep.memory.repair_target_id = struct.id;
                    break;
                }
            } else if (struct.structureType == STRUCTURE_ROAD && Game.map.getTerrainAt(struct.pos) == 'swamp') {
                if (struct.hits < swamp_cut) {
                    heal_tar = struct;
                    creep.memory.repair_to_val = true;
                    creep.memory.repair_cap = 25000;
                    creep.memory.repair_target_id = struct.id;
                    break;
                }
            } else if (struct.structureType == STRUCTURE_CONTAINER) {
                if (struct.hits < container_cut) {
                    heal_tar = struct;
                    creep.memory.repair_to_perc = true;
                    creep.memory.repair_cap = 1.0;
                    creep.memory.repair_target_id = struct.id;
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
    },

    repairToPerc: function(creep,repair_cap,repair_target_id) {
        var repair_target = Game.getObjectById(repair_target_id);
        if (repair_target.hits >= repair_target.hitsMax*repair_cap) {
            creep.memory.repair_to_perc = false;
            return;
        } else if (creep.repair(repair_target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(repair_target);
            return;
        }
    },

    repairToVal: function(creep,repair_cap,repair_target_id) {
        var repair_target = Game.getObjectById(repair_target_id);
        if (repair_cap > repair_target.hitsMax) {
            repair_cap = repair_target.hitsMax;
        }

        if (repair_target.hits >= repair_cap) {
            creep.memory.repair_to_val = false;
            return;
        } else if (creep.repair(repair_target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(repair_target);
            return;
        }
    }
};

module.exports = roleJanitor;