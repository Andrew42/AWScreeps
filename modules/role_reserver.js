var roleReserver = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name != creep.memory.assigned_room) {
            this.moveToRoom(creep,creep.memory.assigned_room);
        } else {
            creep.say('MINE');
            //this.claimControl(creep);
            this.reserveControl(creep);
        }
    },

    moveToRoom: function(creep,room) {
        creep.moveTo(new RoomPosition(27, 35, room));
    },

    claimControl: function(creep) {
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    },

    reserveControl: function(creep) {
        if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //console.log('Reserver: Moving to controller');
            creep.moveTo(creep.room.controller);
        }
    }


};

module.exports = roleReserver;