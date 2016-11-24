var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep,attack_room) {
        creep.memory.attack_room = attack_room;
        if (creep.room.name != creep.memory.attack_room) {
            this.moveToRoom(creep,creep.memory.attack_room);
        } else {
            var hostile_creeps = creep.room.find(FIND_HOSTILE_CREEPS);
            if (hostile_creeps.length > 0) {
                this.attackCreep(creep,hostile_creeps);
            } else if (creep.room.spawn != undefined && !creep.room.spawn.my) {
                this.attackSpawn(creep,creep.room.spawn);
            } else {
                //this.attackStructure(creep,STRUCTURE_WALL);
                //5830c6a7c887b6b9030cd72c
                this.attackObject(creep,'5830c9668147cbe70dbf9a72')
            }
        }
    },

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(27, 35, room_name));
        creep.say(room_name);
    },

    attackCreep: function(creep,hostile_creeps) {
        // For now we just use findClosestByPath, but later we might want to have custom logic for targeting certain creeps
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },

    attackSpawn: function(creep,spawn) {
        if (creep.attack(spawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    },

    attackStructure: function(creep,structure_constant) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == structure_constant)
            }
        });
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },

    attackObject: function(creep,object_id) {
        var target = Game.getObjectById(object_id);
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
};

module.exports = roleAttacker;