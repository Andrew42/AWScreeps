var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep,attack_room) {
        creep.memory.attack_room = attack_room;
        if (creep.room.name != creep.memory.attack_room) {
            creep.say(creep.memory.attack_room);
            this.moveToRoom(creep,creep.memory.attack_room);
        } else {
            var damaged_creeps = _.filter(Game.creeps,
                (tar_creep) => (
                    creep.room.name == tar_creep.room.name && tar_creep.hits < tar_creep.hitsMax
                )
            );
            if (damaged_creeps.length > 0) {
                this.healCreep(creep,damaged_creeps);
            } else {
                //this.attackStructure(creep,STRUCTURE_WALL);
                //5830c6a7c887b6b9030cd72c
                this.moveToRoom(creep,creep.room.name);
            }
        }
    },

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(25, 25, room_name));
    },

    healCreep: function(creep,target_creeps) {
        // For now we just use findClosestByPath, but later we might want to have custom logic for targeting certain creeps
        var target = creep.pos.findClosestByPath(target_creeps);
        if (creep.heal(target) == ERR_NOT_IN_RANGE) {            
            creep.moveTo(target);
            creep.rangedHeal(target);
        }
    }
};

module.exports = roleHealer;