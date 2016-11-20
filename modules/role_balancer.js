var roleBalancer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var fullContainers = 0;




        if (creep.memory.balancing && creep.carry.energy = 0) {
            creep.memory.balancing = false;
            creep.memory.say = ('collecting');
        }
        if (!creep.memory.balancing && creep.carry.energy = creep.carryCapacity) {
            creep.memory.balancing = true;
            creep.memory.say = ('balancing');
        }

        if (creep.memory.balancing)
    }
};

module.exports roleBalancer;