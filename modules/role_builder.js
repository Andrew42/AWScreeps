var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
            } else if (this.repairStructures(creep)){
                creep.say('repairing');
            }
        } else {
            this.storeCargo(creep);
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
        var wall_cut = 125000;
        var rampart_cut = 125000;
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

        return true;
    },

    storeCargo: function(creep) {
        var dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (res) => {
                return res.amount > 100;
            }
        });
        var room_containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && (structure.store[RESOURCE_ENERGY]+creep.carry.energy) > creep.carryCapacity)
            }
        });
        if (dropped_resources.length > 0) {
            if (dropped_resources.length > 0) {
                if(creep.pickup(dropped_resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped_resources[0])
                }
            }
        } else if (room_containers.length > 0) {
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