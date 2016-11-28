var roleTemplate = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //console.log('Name: ',creep.name,' Assigned Container: ',creep.memory.assigned_container);

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
        //var assigned_container = Game.getObjectById(creep.memory.assigned_container);
        var assigned_link = Game.getObjectById(creep.room.memory.storage_link_id);
        if (creep.withdraw(assigned_link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(assigned_link);
        }
    },

    storeCargo: function(creep) {
        var assigned_storage = creep.room.storage;
        if (creep.transfer(assigned_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(assigned_storage);
        }
    }
};

module.exports = roleTemplate;