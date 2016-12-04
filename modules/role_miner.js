var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                return structure.structureType == STRUCTURE_CONTAINER;
            }
        });
        if (creep.ticksToLive < 13 && creep.carry.energy == 0) {
            console.log(creep.name,': SUDOKU');
            creep.suicide();
            //Memory.cities[creep.memory.home].worker_count[creep.memory.role] -= 1;
            return;
        } else if (creep.ticksToLive < CREEP_SPAWN_TIME*creep.body.length+25 && !creep.memory.is_zombie) {
            creep.memory.is_zombie = true;
            //Memory.cities[creep.memory.home].worker_count[creep.memory.role] += 1;
        }

        if (container != undefined) {
            //console.log(creep.name,':',container.structureType);
            //console.log('\tisNear:',creep.pos.isNearTo(container));
            if (creep.pos.isNearTo(container) && (Game.getObjectById(creep.memory.assigned_source).energy == 0 || _.sum(container.store) == 2000)) {
                if (container.hits < container.hitsMax && creep.carry.energy > 0) {
                    creep.repair(container);
                    return;
                }
            }
        }

        if (!creep.memory.mining && creep.carry.energy == 0) {
            creep.memory.mining = true;
            creep.say('mining');
        }
        //if (creep.memory.mining && creep.carry.energy == creep.carryCapacity) {
        if (creep.memory.mining && creep.carry.energy > creep.carryCapacity*0.9) {
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