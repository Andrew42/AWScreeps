var structTower = {

    /** @param {Creep} creep **/
    attack: function(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    },
    
    heal: function(tower) {
        var wall_cut = 15000;
        var rampart_cut = 25000;
        var damagedStructures = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        var heal_tar = undefined;
        for (var i in damagedStructures) {
            var struct = damagedStructures[i];
            if (struct.structureType == STRUCTURE_WALL) {
                if (struct.hits < wall_cut) {
                    heal_tar = struct;
                    break;
                }
            } else if (struct.structureType == STRUCTURE_RAMPART) {
                if (struct.hits < rampart_cut) {
                    heal_tar = struct;
                    break;
                }
            } else {
                heal_tar = struct;
                break;
            }
        }
        if (heal_tar == undefined) {
            return;
        }
        tower.repair(heal_tar);
    }
};

module.exports = structTower;