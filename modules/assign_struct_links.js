getStructures = require('get_structures');


//if (creep.source_room.memory.source_links != undefined) {
//    var source_link_ids = creep.source_room.memory.source_links;
//    var source_link_objs = []
//    for (var j in source_link_ids) {
//        source_link_objs.push(Game.getObjectById(source_link_ids[j]));
//    }
//    var closest_source_link = source_obj.pos.findClosestByPath(source_link_objs);
//    creep.memory.assigned_link = closes_source_link.id;
//}

var assignStructLinks =  {
    run: function(avail_rooms) {
        for (var i in avail_rooms) {
            var curr_room = avail_rooms[i];
            var struct_ids = getStructures.run([curr_room],STRUCTURE_LINK);

            var active_struct_ids = _.filter(struct_ids, (struct) => 
                (Game.getObjectById(struct).structureType == STRUCTURE_LINK && Memory.struct_links[struct].link_type != null)
            );
            var inactive_struct_ids = _.filter(struct_ids, (struct) =>
                (Game.getObjectById(struct).structureType == STRUCTURE_LINK && Memory.struct_links[struct].link_type == null)
            );

            //var test_structs = _.filter(structs, (struct) =>
            //    (Game.getObjectById(struct).structureType == STRUCTURE_LINK && Memory.struct_links[struct].link_type == null)
            //);

            //if (test_structs.length > 0) {                
            //    //console.log('Test1: ',structs.length);
            //    //console.log('Test2: ',test_structs.length);
            //    //console.log('Test3: ',test_structs[0]);
            //}

            //console.log('Curr Room: ',curr_room);

            if (inactive_struct_ids.length == 0) {
                continue;
            } else {
                var avail_targets = this.getAvailableObjects(active_struct_ids,curr_room);
                this.assignObjects(inactive_struct_ids,avail_targets);
            }
        }
    },

    getAvailableObjects(curr_room) {
        var avail_objs = curr_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
            }
        });
        return avail_objs;
    },

    assignObjects(inactive_structs,avail_targets) {
        for (var i in inactive_structs) {
            var curr_struct = Game.getObjectById(inactive_structs[i]);
            var closest_struct = curr_struct.pos.findClosestByRange(avail_targets);
            if (closest_struct.structureType == STRUCTURE_CONTAINER) {
                console.log('Making source link');
                Memory.struct_links[curr_struct.id].link_type = 'source_link';

                if (curr_struct.room.memory.source_links == undefined) {
                    curr_struct.room.memory.source_links = [];
                }
                curr_struct.room.memory.source_links.push(curr_struct.id);

            } else if (closest_struct.structureType == STRUCTURE_STORAGE) {
                console.log('Making storage link');
                Memory.struct_links[curr_struct.id].link_type = 'storage_link';
                curr_struct.room.memory.storage_link_id = curr_struct.id;
            } else {
                console.log('Unknown structure type: ',curr_struc.structureType);
            }
        }
    }

};

module.exports = assignStructLinks;