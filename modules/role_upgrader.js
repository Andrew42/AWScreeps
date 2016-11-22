var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep,avail_rooms) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            if (creep.room.name != creep.memory.home) {
                //creep.say('going home');
                creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
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
        }
    }
};

module.exports = roleUpgrader;