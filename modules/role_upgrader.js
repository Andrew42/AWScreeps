var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep,source) {
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
        }
    }
};

module.exports = roleUpgrader;