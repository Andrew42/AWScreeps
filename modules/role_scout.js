var roleScout = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
    },

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(25, 25, room_name));
        creep.say(room_name);
    }
};

module.exports = roleScout;