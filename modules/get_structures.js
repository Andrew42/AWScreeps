var getStructures = {

    /** @param {Creep} creep **/
    run: function(rooms,structure_constant) {
        var structs = [];
        for (var i in rooms) {
            var room = rooms[i];
            var room_structs = room.find(FIND_STRUCTURES);
            for (var j in room_structs) {
                var struct = room_structs[j];
                if (struct.structureType == structure_constant) {
                    //console.log('Structure ID: ',struct.id);
                    structs.push(struct.id);
                } else {
                    //console.log('Other: ',struct.structureType);
                }
            }
        }
        //console.log('Structs:',structs);
        return structs;
    }
};

module.exports = getStructures;