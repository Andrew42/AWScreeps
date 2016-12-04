var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //if (creep.ticksToLive < 100 && creep.body.length < 20) {
        //    creep.memory.being_renewed = true;
        //} else if (creep.tickToLive > 1300) {
        //    creep.memory.being_renewed = false;
        //}
        //if (creep.memory.being_renewed) {
        //    var spawn = creep.room.pos.findClosestByRange(FIND_MY_SPAWNS);
        //} else if (creep.carry.energy == 0) {
        //    this.getCargo(creep);
        //} else {
        //    this.storeCargo(creep);
        //}

        if (creep.ticksToLive < 10 && creep.carry.energy == 0) {
            console.log(creep.name,': SUDOKU');
            creep.suicide();
        } else if (creep.ticksToLive < CREEP_SPAWN_TIME*creep.body.length+10 && !creep.memory.is_zombie) {
            creep.memory.is_zombie = true;
        }
        
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

        if (creep.room.storage != undefined) {
            var storage_val = creep.room.storage.store[RESOURCE_ENERGY];
        } else {
            var storage_val = 0
        }

        if (dropped_resources.length > 0) {
            if (dropped_resources.length > 0) {
                if(creep.pickup(dropped_resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped_resources[0])
                }
            }
        } else if (storage_val > 0) {
            if (creep.withdraw(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
            }
        } else {
            var roomContainers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
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

    storeCargo: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity) ||
                            (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity);
                }
        });

        if (targets.length > 0) {
            var best_target = creep.pos.findClosestByPath(targets);
            if (creep.transfer(best_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(best_target);
            }
        } else {
            //if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(creep.room.storage);
            //}

            //creep.moveTo(Game.spawns['Spawn1']);
            var home_spawn = Game.getObjectById(creep.spawn_id);
            creep.moveTo(home_spawn);
        }
        //if(targets.length > 0) {
        //    var best_target = targets[0];
        //    for(var i in targets) {
        //        var tar = targets[i];
        //        if(tar.structureType == STRUCTURE_SPAWN) {
        //            best_target = tar;
        //        } else if(tar.structureType == STRUCTURE_EXTENSION && best_target.structureType != STRUCTURE_SPAWN) {
        //            best_target = tar;
        //        }
        //    }
        //    if (creep.transfer(best_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //        creep.moveTo(best_target);
        //    }
        //} else {
        //    //creep.say('Going Home')
        //    creep.moveTo(Game.spawns['Spawn1'])
        //}
    }
};

module.exports = roleHarvester;