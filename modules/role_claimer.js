var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep,room) {
        if (creep.room.name != room.name) {
            this.moveToRoom(creep,room);
        } else {
            this.claimControl(creep);
        }
    },

    moveToRoom: function(creep,room) {
        creep.moveTo(new RoomPosition(27, 35, room_name));
    },

    claimControl: function(creep) {
        if (creep.room.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }


};

module.exports = roleClaimer;