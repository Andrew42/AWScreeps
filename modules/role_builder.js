var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep,avail_rooms) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var const_sites = Game.constructionSites;
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
        } else {
            if (creep.room.name != creep.memory.home) {
                //creep.say('going home');
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
        }
    }
};

module.exports = roleBuilder;