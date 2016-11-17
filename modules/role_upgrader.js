var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep,source) {
        if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;