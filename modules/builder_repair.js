var builderRepair = {
    /** @param {Creep} creep **/
    run: function(creep,struc) {
        if (creep.repair(struc) == ERR_NOT_IN_RANGE) {
            creep.moveTo(struc);
        }
    }
};

module.exports = builderRepair;