var roleTemplate = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0) {
            //creep.say('collecting');
            this.getCargo(creep);
        } else {
            //creep.say('storing');
            this.storeCargo(creep);
        }
    },

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(27, 35, room_name));
        creep.say(room_name);
    },

    getCargo: function(creep) {
        var assigned_container = Game.getObjectById(creep.memory.assigned_container);
        if (creep.withdraw(assigned_container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && assigned_container.store[RESOURCE_ENERGY] > creep.carryCapacity*0.25) {
            creep.moveTo(assigned_container);
        } else {
            creep.moveTo(Game.getObjectById(creep.memory.assigned_storage));
        }
    },

    storeCargo: function(creep) {
        var assigned_storage = Game.getObjectById(creep.memory.assigned_storage);
        if (creep.transfer(assigned_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(assigned_storage);
        }
    }
};

module.exports = roleTemplate;