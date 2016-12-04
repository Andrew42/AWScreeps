var roleTowerFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.ticksToLive < 16 && creep.carry.energy == 0) {
            console.log(creep.name,': SUDOKU');
            creep.suicide();
        } else if (creep.ticksToLive < CREEP_SPAWN_TIME*creep.body.length+25 && !creep.memory.is_zombie) {
            creep.memory.is_zombie = true;
        }
        
        if (!creep.memory.filling_tower && creep.carry.energy == creep.carryCapacity) {
            creep.memory.filling_tower = true;
            creep.say('Filling');
        } else if (creep.memory.filling_tower && creep.carry.energy == 0) {
            creep.memory.filling_tower = false;
        }

        if (creep.memory.filling_tower) {
            this.storeCargo(creep);
        } else {
            this.getCargo(creep);
        }

        if (creep.carry.energy == 0) {
            this.getCargo(creep);
        } else {
            if (!this.storeCargo(creep)) {
                var towers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER
                    }
                });
                creep.moveTo(creep.pos.findClosestByPath(towers));
            }
        }
    },

    getCargo: function(creep) {
        var room = creep.memory.assigned_room;
        var roomContainers = Game.rooms[room].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > creep.carryCapacity) ||
                        (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > creep.carryCapacity)
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
    },

    storeCargo: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity*0.90);
                }
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            return false;
            //var home_spawn = Game.getObjectById(creep.spawn_id);
            //creep.say('Going Home')
            //creep.moveTo(home_spawn);
        }

        return true;
    }
};

module.exports = roleTowerFiller;