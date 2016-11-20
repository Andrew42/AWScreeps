var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
            //console.log('Site: ',target.id);
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            //if(targets.length > 0) {
            //    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            //        creep.moveTo(targets[0]);
            //    }
            //} else {
            //    creep.moveTo(Game.spawns['Spawn1'])
            //}
        }
        else {
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

            //if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(source);
            //}
        }
    }
};

module.exports = roleBuilder;