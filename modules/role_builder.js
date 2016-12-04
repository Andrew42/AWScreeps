var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.ticksToLive < 25 && creep.carry.energy == 0) {
            console.log(creep.name,': SUDOKU');
            creep.suicide();
        }

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }


        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            if (this.buildStructures(creep)) {
                creep.say('building');
            } else if (creep.room.name != creep.memory.home) {
                //console.log('creep.room.name: ',creep.room.name);
                //console.log('creep.home: ',creep.home);
                this.moveToRoom(creep,creep.memory.home);
            } else {
                if (creep.memory.repair_to_perc) {
                    this.repairToPerc(creep,creep.memory.repair_cap,creep.memory.repair_target_id);
                } else if (creep.memory.repair_to_val) {
                    this.repairToVal(creep,creep.memory.repair_cap,creep.memory.repair_target_id);
                } else {
                    this.repairStructures(creep);
                }
                creep.say('repairing');
            }
        } else {
            this.getCargo(creep);
        }
    },

    buildStructures: function(creep) {
        //creep.say('building');
        var const_sites = Game.constructionSites;
        //console.log('Sites: ',const_sites);
        //console.log('Length: ',Object.keys(const_sites).length);
        if (Object.keys(const_sites).length == 0) {
            return false;
        }

        var target = undefined;
        for (i in const_sites) {
            var site = const_sites[i];
            if (site.id) {
                target = Game.getObjectById(site.id);
                break;
            }
        }
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target)
        }

        return true;
    },

    repairStructures: function(creep) {
        var wall_cut = 300000;
        var rampart_cut = 300000;
        var rampart_cap = rampart_cut + 50000;
        var plain_cut = 1000;
        var swamp_cut = 5000;
        var container_cut = 150000;
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
                    creep.memory.repair_cap = rampart_cap;
                    creep.memory.repair_target_id = struct.id;
                    heal_tar = struct;
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
            } else {
                heal_tar = struct;
                break;
            }
        }

        console.log('heal_tar:',heal_tar);
        //console.log('heal_type:',heal_tar.structureType);

        if (creep.repair(heal_tar) == ERR_NOT_IN_RANGE) {
            creep.moveTo(heal_tar);
        }
    },

    repairToPerc: function(creep,repair_cap,repair_target_id) {
        var repair_target = Game.getObjectById(repair_target_id);
        if (repair_target == null) {
            creep.memory.repair_to_perc = false;
        }

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
        if (repair_target == null) {
            creep.memory.repair_to_val = false;
        }

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
    },

    getCargo: function(creep) {
        var dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (res) => {
                return res.amount > 400;
            }
        });
        var room_containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1000) ||
                        (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 5000)
            }
        });
        if (dropped_resources.length > 0) {
            if (dropped_resources.length > 0) {
                if(creep.pickup(dropped_resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped_resources[0])
                }
            }
        } else if (room_containers.length*1 > 0) {
            if (creep.withdraw(room_containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(room_containers[0]);
            }
        } else if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
            return;
        } else {
            //var closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //    filter: (structure) => {
            //        return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > creep.carryCapacity)
            //    }
            //});
            //if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(closestContainer);
            //}
            var roomContainers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > creep.carryCapacity) ||
                            (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > creep.carryCapacity)
                }
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

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(25, 25, room_name));
        //creep.say(room_name);
    }
};

module.exports = roleBuilder;