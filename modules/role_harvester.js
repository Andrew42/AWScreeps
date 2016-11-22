var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,avail_rooms) {
        //if(creep.carry.energy < creep.carryCapacity) {
        if (creep.carry.energy == 0) {
            this.getCargo(creep);
        } else {
            this.storeCargo(creep);
        }
    },

    getCargo: function(creep) {
        // Only attempt to collect dropped resources if the amount is above some threshold
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
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > creep.carryCapacity)
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
        }
        if (creep.withdraw(fullestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(fullestContainer);
        }
    },

    storeCargo: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity) ||
                            (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity) ||
                            (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity) ||
                            (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity*0.60);
                }
        });
        if(targets.length > 0) {
            var best_target = targets[0];
            for(var i in targets) {
                var tar = targets[i];
                if(tar.structureType == STRUCTURE_SPAWN) {
                    best_target = tar;
                } else if(tar.structureType == STRUCTURE_EXTENSION && best_target.structureType != STRUCTURE_SPAWN) {
                    best_target = tar;
                } else if(tar.structureType == STRUCTURE_TOWER && !(best_target.structureType == STRUCTURE_SPAWN || best_target.structureType == STRUCTURE_EXTENSION)) {
                    best_target = tar;
                } else if (tar.structureType == STRUCTURE_STORAGE && !(best_target.structureType == STRUCTURE_SPAWN || best_target.structureType == STRUCTURE_EXTENSION || best_target.structureType == STRUCTURE_TOWER)) {
                    best_target = tar;
                }
            }
            if (creep.transfer(best_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(best_target);
            }
        } else {
            //creep.say('Going Home')
            creep.moveTo(Game.spawns['Spawn1'])
        }
    }
};

module.exports = roleHarvester;