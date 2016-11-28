var roleStarter = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.mining && creep.carry.energy == 0) {
            creep.memory.mining = true;
            this.getCargo(creep);
        }

        if (creep.memory.mining && creep.carry.energy == creep.carryCapacity ) {
            creep.memory.mining = false;
            this.storeCargo(creep);
        }

        if (creep.memory.mining) {
            this.getCargo(creep);
        } else {
            this.storeCargo(creep);
        }
    },

    getCargo: function(creep) {
        var source_targets = creep.room.find(FIND_SOURCES);
        if(creep.harvest(source_targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source_targets[0]);
        }
    },

    storeCargo: function(creep) {
        var spawn = Game.getObjectById(creep.memory.spawn_id);
        var construction_sites = creep.room.find(FIND_CONSTRUCTION_SITES);
        var extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity)
                }
            });
        var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < 1900)
                }
        });
        if (spawn.energy < spawn.energyCapacity) {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        } else if (extensions.length > 0) {
            var target = creep.pos.findClosestByPath(extensions);
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else if (containers.length > 0) {
            var target = creep.pos.findClosestByPath(containers);
            if (creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else if (construction_sites.length > 0) {
            var target = creep.pos.findClosestByPath(construction_sites);
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = roleStarter;