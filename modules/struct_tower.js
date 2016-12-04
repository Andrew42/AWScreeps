var structTower = {

    /** @param {Creep} creep **/
    run: function(tower,valid_enemies) {
        if (_.keys(valid_enemies).length > 0) {
            this.attack(tower,valid_enemies);
            return;
        } else if (this.healCreeps(tower)) {
            return;
        } else if (this.healStructures(tower)) {
            return;
        }
    },

    attack: function(tower,valid_enemies) {
        var healer_targets = _.filter(valid_enemies,(creep) => this.countCreepParts(creep,HEAL) > 0);
        var attacker_targets = _.filter(valid_enemies,(creep) => this.countCreepParts(creep,ATTACK) > 0);

        if (healer_targets.length > 0) {
            closest_hostile = tower.pos.findClosestByRange(healer_targets);
            if (closest_hostile) {
                tower.attack(closest_hostile);
            }
        } else if (attacker_targets > 0) {
            closest_hostile = tower.pos.findClosestByRange(attacker_targets);
            if (closest_hostile) {
                tower.attack(closest_hostile);
            }
        } else {
            closest_hostile = tower.pos.findClosestByRange(valid_enemies);
            if (closest_hostile) {
                tower.attack(closest_hostile);
            }
        }

        //var closestHostile = tower.pos.findClosestByRange(valid_enemies);
        //if(closestHostile) {
        //    tower.attack(closestHostile);
        //}
    },
    
    healCreeps: function(tower) {
        var damagedCreeps = _.filter(Game.creeps, (creep) => (creep.room.name == tower.room.name && creep.hits < creep.hitsMax));
        if (damagedCreeps == undefined) {
            return false;
        } else if (damagedCreeps.length == 0) {
            return false;
        } else {
            tower.heal(damagedCreeps[0]);
            return true;
        }
    },

    healStructures: function(tower) {
        var wall_cut = 150000;
        var rampart_cut = 100000;
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
            return false;
        }
        tower.repair(heal_tar);
        return true;
    },

    countCreepParts: function(creep,part_constant) {
        var count = 0;
        for (var i in creep.body) {
            var body_part = creep.body[i];
            if (body_part.type == part_constant) {
                count += 1;
            }
        }
        return count
    }
};

module.exports = structTower;