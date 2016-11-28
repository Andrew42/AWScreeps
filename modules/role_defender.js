var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var heal_targets = _.filter(Game.creeps, (tar_creep) => (tar_creep.room.name == creep.room.name && tar_creep.hits < tar_creep.hitsMax));

        if (creep.room.name != creep.memory.assigned_room) {
            creep.say(creep.memory.assigned_room);
            this.moveToRoom(creep,creep.memory.assigned_room);
        } else {
            var hostile_creeps = creep.room.find(FIND_HOSTILE_CREEPS);
            if (hostile_creeps.length > 0) {
                this.attackCreep(creep,hostile_creeps);
            } else if (creep.hits < creep.hitsMax) {
                creep.heal(creep);
            } else if (heal_targets.length > 0) {
                var target = creep.pos.findClosestByPath(heal_targets);
                console.log(creep.name,'is healing:',target.name);
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                this.moveToRoom(creep,creep.room.name);
            }
        }
    },

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(25, 25, room_name));
    },

    attackCreep: function(creep,hostile_creeps) {
        // For now we just use findClosestByPath, but later we might want to have custom logic for targeting certain creeps
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
};

module.exports = roleDefender;