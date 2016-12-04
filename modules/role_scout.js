var roleScout = {
    /** @param {Creep} creep **/
    run: function(creep,room_name) {
        //if (creep.ticksToLive < 1 && creep.carry.energy == 0) {
        //    console.log(creep.name,': SUDOKU');
        //    creep.suicide();
        //}
    },

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(25, 25, room_name));
        creep.say(room_name);
    }
};

module.exports = roleScout;