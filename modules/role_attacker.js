var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep,attack_room) {
        creep.memory.attack_room = attack_room;
        if (attack_room == null && creep.room.name != creep.memory.assigned_room) {
            creep.say(creep.memory.assigned_room);
            this.moveToRoom(creep,creep.memory.assigned_room);
        } else if (creep.room.name != creep.memory.attack_room) {
            creep.say(creep.memory.attack_room);
            this.moveToRoom(creep,creep.memory.attack_room);
        } else {
            var room_spawns = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN)
                }
            });
            var hostile_towers = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER)
                }
            })
            var hostile_creeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: (creep) => {
                    return (creep.pos.x != 0 || creep.pos.x != 49 || creep.pos.y != 0 || creep.pos.y != 49)
                }
            });
            if (hostile_towers.length > 0) {
                this.attackStructure(creep,hostile_towers);
            } else if (hostile_creeps.length > 0) {
                this.attackCreep(creep,hostile_creeps);
            } else if (room_spawns.length > 0) {
                this.attackSpawn(creep,room_spawns[0]);
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

    attackCreep: function(creep,hostile_creeps) {
        // For now we just use findClosestByPath, but later we might want to have custom logic for targeting certain creeps
        var target = creep.pos.findClosestByPath(hostile_creeps);
        var val = (target.pos.x != 0 || target.pos.x != 49 || target.pos.y != 0 || target.pos.y != 49)
        console.log('Attacking:',target.id);
        console.log('pos:',target.pos.x,target.pos.y);
        console.log('val:',val);
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },

    attackSpawn: function(creep,spawn) {
        if (creep.attack(spawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    },

    attackStructure: function(creep,structure) {
        if (creep.attack(structure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
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