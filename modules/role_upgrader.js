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
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }

        //if(creep.carry.energy < creep.carryCapacity*(3/5)) {
        //    var sources = creep.room.find(FIND_SOURCES);
        //    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        //        creep.moveTo(source);
        //    }
        //}
        //else {
        //    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //        creep.moveTo(creep.room.controller);
        //    }
        //}
    }
};

module.exports = roleUpgrader;