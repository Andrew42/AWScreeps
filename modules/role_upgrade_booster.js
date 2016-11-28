var roleUpgradeBooster = {
    /** @param {Creep} creep **/
    run: function(creep,target_room) {
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
        var home_spawn = Game.getObjectById(creep.memory.spawn_id);
        var home_storage = home_spawn.room.storage;
        if (creep.withdraw(home_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(home_storage);
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