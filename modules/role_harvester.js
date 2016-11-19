var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,source) {
        if(creep.carry.energy < creep.carryCapacity) {
            //var roomContainers = creep.room.find(FIND_STRUCTURES, {
            //    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
            //});
            //var fullestContainer = roomContainers[0];
            //for (var i in roomContainers) {
            //    var tar = roomContainers[i];
            //    var tar_dist = creep.pos.getRangeTo(tar);
            //    var full_dist = creep.pos.getRangeTo(fullestContainer);
            //    if (tar.store[RESOURCE_ENERGY]/tar_dist > fullestContainer.store[RESOURCE_ENERGY]/full_dist) {
            //        fullestContainer = tar;
            //    }
            //}
            //if (creep.withdraw(fullestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(fullestContainer);
            //}

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                var best_target = targets[0];
                for(var tar in targets) {
                    if(tar.structureType == STRUCTURE_EXTENSION) {
                        best_target = tar
                    } else if(tar.structureType == STRUCTURE_TOWER && best_target.structureType != STRUCTURE_EXTENSION) {
                        best_target = tar
                    } else if(tar.structureType == STRUCTURE_SPAWN && !(best_target.structureType == STRUCTURE_EXTENSION || best_target.structureType == STRUCTURE_TOWER)) {
                        best_target = tar
                    }
                }
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                //creep.say('Going Home')
                creep.moveTo(Game.spawns['Spawn1'])
            }
        }
    }
};

module.exports = roleHarvester;