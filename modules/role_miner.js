var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.mining && creep.carry.energy == 0) {
            creep.memory.mining = true;
            creep.say('mining');
        }
        //if (creep.memory.mining && creep.carry.energy == creep.carryCapacity) {
        if (creep.memory.mining && creep.carry.energy > 95) {
            creep.memory.mining = false;
            creep.say('storing');
        }

        if (creep.memory.mining) {
            var source = Game.getObjectById(creep.memory.assigned_source);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else if (creep.pos.isNearTo(Game.getObjectById(creep.memory.assigned_link))) {
            //var test_creep = Game.getObjectById('5836c07d6c77593b101e7aa9')
            //var test_link_id = test_creep.memory.assigned_link;
            //var correct_link_id = '58361ed2ed0581cd46e5550f'
            //console.log('Name: ',test_creep.name);
            //console.log('Test link id: ',test_link_id);
            //console.log('Correct link id: ',correct_link_id);
            //console.log('Link Pos: ',Game.getObjectById(correct_link_id).structureType);
            //console.log('isNearLink: ',test_creep.pos.isNearTo(Game.getObjectById(test_creep.memory.assigned_link)));
            //console.log('isNearSource: ',test_creep.pos.isNearTo(Game.getObjectById(test_creep.memory.assigned_source)));

            creep.transfer(Game.getObjectById(creep.memory.assigned_link),RESOURCE_ENERGY);
        } else {
            var closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
            });
            if (creep.transfer(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer);
            } else if (closestContainer == undefined) {
                creep.drop(RESOURCE_ENERGY);
            }
        }
    },

    placeLink: function(creep) {

    }
};

module.exports = roleMiner;