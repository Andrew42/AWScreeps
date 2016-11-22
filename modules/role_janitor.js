var roleJanitor = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name != creep.memory.home) {
            //creep.say('going home');
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
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
                filter: (structure) => structure.hits < structure.hitsMax*0.5
            });
            if (repair_tars.length > 0) {
                creep.say('repairing');
                creep.memory.repairing = true;
            } else {
                creep.memory.repairing = false;
            }
        }

        if (creep.memory.repairing && creep.carry.energy > 0) {
            if (creep.repair(repair_tars[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repair_tars[0]);
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
            //var dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES);
            //if (dropped_resources.length > 0) {
            //    if(creep.pickup(dropped_resources[0]) == ERR_NOT_IN_RANGE) {
            //        creep.moveTo(dropped_resources[0])
            //    }
            //} else {
            //    if (creep.withdraw(fullestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //        creep.moveTo(fullestContainer);
            //    }
            //}
        }
    }
};

module.exports = roleJanitor;