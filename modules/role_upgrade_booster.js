var roleUpgradeBooster = {
    /** @param {Creep} creep **/
    run: function(creep,target_room) {
        /* DONE */

        if (Game.rooms[target_room] == undefined) {
            console.log('Unknown room, make sure to scout it first!');
            return;
        }

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('collecting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            this.storeCargo(creep,target_room);
        } else {
            this.getCargo(creep);
        }
    },

    getCargo: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES,{
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500) ||
                        (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 5000)
            }
        });
        if (targets.length > 0) {
            var closest_target = creep.pos.findClosestByRange(targets);
            if (creep.withdraw(closest_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closest_target);
            }
        }
    },

    storeCargo: function(creep,target_room) {
        var target_controller = Game.rooms[target_room].controller;
        if (creep.upgradeController(target_controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target_controller);
        }
    }
};

module.exports = roleUpgradeBooster;