var roleJanitor = {

    /** @param {Creep} creep **/
    run: function(creep,source) {
        if(!creep.memory.cleaning && creep.carry.energy == 0) {
            creep.memory.cleaning = true;
            creep.memory.repairing = false;
            creep.memory.building = false;
            creep.memory.upgrading = false;
            creep.say('cleaning');
        } else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.cleaning = false;
            creep.memory.repairing = false;
            creep.memory.building = false;
            creep.memory.upgrading = false;
        }

        if(!creep.memory.cleaning) {
            var repair_tars = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax*0.5
            });
            var build_tars = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (repair_tars.length > 0) {
                creep.repairing = true;
                creep.memory.building = false;
                creep.memory.upgrading = false;
            } else if (build_tars.length > 0) {
                creep.memory.repairing = false;
                creep.memory.building = true;
                creep.memory.upgrading = false;
            } else {
                creep.memory.repairing = false;
                creep.memory.building = false;
                creep.memory.upgrading = true;
            }
        }


        if (creep.memory.repairing && creep.carry.energy > 0) {
            if (creep.repair(repair_tars[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repair_tars[0])
            }
        } else if (creep.memory.building && creep.carry.energy > 0) {
            //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(creep.build(build_tars[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(build_tars[0]);
            }
        } else if (creep.memory.upgrading && creep.carry.energy > 0) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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
            var dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES);
            if (dropped_resources.length > 0) {
                if(creep.pickup(dropped_resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped_resources[0])
                }
            } else {
                if (creep.withdraw(fullestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(fullestContainer);
                }
            }
        }
    }
};

module.exports = roleJanitor;