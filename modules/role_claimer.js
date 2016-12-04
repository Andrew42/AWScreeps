var roleClaimer = {

//Error: invalid arguments in RoomPosition constructor
//    at new <anonymous> (evalmachine.<anonymous>:1:72)
//    at Object.moveToRoom (role_claimer:20:22)
//    at Object.run (role_claimer:12:18)
//    at Object.module.exports.loop (main:202:25)
//    at __mainLoop:1:52

    /** @param {Creep} creep **/
    run: function(creep,target_room) {
        //if (creep.ticksToLive < 1 && creep.carry.energy == 0) {
        //    console.log(creep.name,': SUDOKU');
        //    creep.suicide();
        //}

        var room = Game.rooms[target_room];
        if (room == undefined) {
            console.log('Room',target_room,'is undefined, scout it first!');
            return;
        }

        if (creep.room.name != room.name) {
            this.moveToRoom(creep,room);
        } else {
            creep.say('MINE');
            this.claimControl(creep);
        }
    },

    moveToRoom: function(creep,room) {
        creep.moveTo(new RoomPosition(27, 35, room.name));
    },

    claimControl: function(creep) {
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = roleClaimer;