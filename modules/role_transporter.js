var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //console.log('Name: ',creep.name,' Assigned Container: ',creep.memory.assigned_container);

        if (creep.ticksToLive < 50 && creep.carry.energy == 0) {
            console.log(creep.name,': SUDOKU');
            creep.suicide();
        } else if (creep.ticksToLive < CREEP_SPAWN_TIME*creep.body.length+25 && !creep.memory.is_zombie) {
            creep.memory.is_zombie = true;
            //Memory.cities[creep.memory.home].worker_count[creep.memory.role] += 1;
        }

        //if (!creep.memory.on_path) {
        //    this.moveToHead(creep);
        //    return;
        //} else {
        //    if (creep.carry.energy == 0) {
        //        //console.log('Getting cargo...');
        //        this.sim_getCargo(creep);
        //    } else {
        //        //console.log('Storing cargo...');
        //        this.sim_storeCargo(creep);
        //    }
        //}

        if (creep.carry.energy == 0) {
            //creep.say('collecting');
            this.getCargo(creep);
        } else {
            //creep.say('storing');
            this.storeCargo(creep);
        }
    },

    moveToRoom: function(creep,room_name) {
        creep.moveTo(new RoomPosition(27, 35, room_name));
        creep.say(room_name);
    },

    sim_getCargo:function(creep) {
        var assigned_container = Game.getObjectById(creep.memory.assigned_container);
        if (creep.withdraw(assigned_container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.iterateForward(creep);
        }
    },

    sim_storeCargo: function(creep) {
        var assigned_storage = Game.getObjectById(creep.memory.assigned_storage);
        if (creep.transfer(assigned_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.iterateBackward(creep);
        }
    },

    getCargo: function(creep) {
        var assigned_container = Game.getObjectById(creep.memory.assigned_container);
        if (creep.withdraw(assigned_container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && assigned_container.store[RESOURCE_ENERGY] > creep.carryCapacity*0.25) {
            creep.moveTo(assigned_container);
        } else {
            creep.moveTo(Game.getObjectById(creep.memory.assigned_storage));
        }
    },

    storeCargo: function(creep) {
        var assigned_storage = Game.getObjectById(creep.memory.assigned_storage);
        if (creep.transfer(assigned_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(assigned_storage);
        }
    },

    iterateForward: function(creep) {
        console.log('Name:',creep.name);

        if (!this.checkPos(creep)) {
            console.log('\tPosition mis-match!');
            creep.memory.path_index -= 1;
        }

        var path_index = creep.memory.path_index;
        var creep_path = creep.memory.assigned_path;
        var creep_pos = creep_path[path_index+1];
        var direction = creep.pos.getDirectionTo(creep_pos.x,creep_pos.y);

        console.log('\tcurr index:',path_index);
        console.log('\tdirection:',direction);

        var mov_result = creep.move(direction);
        if (mov_result == OK) {
            creep.memory.path_index += 1;
            console.log('\tMoving forward...');
            console.log('\tNew path index:',creep.memory.path_index)
        } else {
            console.log('\tFORWARD_ERROR:',mov_result);
        }

    },

    iterateBackward: function(creep) {
        console.log('Name:',creep.name);

        if (!this.checkPos(creep)) {
            console.log('Position mis-match!');
            creep.memory.path_index += 1;
        }

        var path_index = creep.memory.path_index;
        var creep_path = creep.memory.assigned_path;
        var creep_pos = creep_path[path_index-1];
        var direction = creep.pos.getDirectionTo(creep_pos.x,creep_pos.y);

        console.log('\tcurr index:',path_index);
        console.log('\tdirection:',direction);

        var mov_result = creep.move(direction);
        if (mov_result == OK) {
            creep.memory.path_index -= 1;
            console.log('\tMoving backward...');
            console.log('\tNew path index:',creep.memory.path_index)
        } else {
            console.log('\tBACKWARD_ERROR:',mov_result)
        }
    },

    moveToHead: function(creep) {
        var head_node = creep.memory.assigned_path[0];
        if (head_node == undefined) {
            console.log('Undefined head node...');
            return;
        }

        if (creep.pos.x == head_node.x && creep.pos.y == head_node.y) {
            console.log('We are at the head node!');
            creep.memory.path_index = 0;
            creep.memory.on_path = true;
        } else {
            console.log('Moving to head node...');
            creep.moveTo(new RoomPosition(head_node.x,head_node.y,head_node.roomName));
        }
    },

    checkPos: function(creep) {
        var path_index = creep.memory.path_index;
        var creep_path = creep.memory.assigned_path;
        var creep_pos = creep_path[path_index];

        if (creep.pos.x == creep_pos.x && creep.pos.y == creep_pos.y) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = roleTransporter;