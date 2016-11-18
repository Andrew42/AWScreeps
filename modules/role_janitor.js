var roleJanitor = {

    /** @param {Creep} creep **/
    run: function(creep,source) {
        if(!creep.memory.cleaning && creep.carry.energy == 0) {
            creep.memory.cleaning = true;
            creep.memory.building = false;
            creep.memory.upgrading = false;
            creep.say('cleaning');
        } else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.cleaning = false;
            creep.memory.building = false;
            creep.memory.upgrading = false;
        }

        if(!creep.memory.cleaning) {
            var build_tars = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (build_tars.length > 0) {
                creep.memory.building = true
            } else {
                creep.memory.upgrading = true
            }
        }

        if(creep.memory.building && creep.carry.energy > 0) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else if(creep.memory.upgrading && creep.carry.energy > 0) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            var targets = creep.room.find(FIND_DROPPED_RESOURCES);
            if(targets.length > 0) {
                if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0])
                }
            } 
        }

        ///////////////////////////////////////////////////////
        //if(creep.memory.upgrading && creep.carry.energy == 0) {
        //    creep.memory.upgrading = false;
        //    creep.say('cleaning');
        //}
        //if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
        //    creep.memory.upgrading = true;
        //    creep.say('upgrading');
        //}
        //if(creep.memory.upgrading) {
        //    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //        creep.moveTo(creep.room.controller);
        //    }
        //} else {
        //    var targets = creep.room.find(FIND_DROPPED_RESOURCES);
        //    if(targets.length > 0) {
        //        if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
        //            creep.moveTo(targets[0])
        //        }
        //    }
        //}
    }
};

module.exports = roleJanitor;