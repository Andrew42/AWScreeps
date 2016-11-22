var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.mining && creep.carry.energy == 0) {
            creep.memory.mining = true;
            creep.say('mining');
        }
        //if (creep.memory.mining && creep.carry.energy == creep.carryCapacity) {
        if (creep.memory.mining && creep.carry.energy > 95) {
            creep.memory.mining = false;
            creep.say('storing');
        }

        if (creep.memory.mining) {
            var source = Game.getObjectById(creep.memory.assigned_source);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
            });
            if (creep.transfer(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer);
            }
        }
    }
};

module.exports = roleMiner;