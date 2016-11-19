var towerAttack = {
    /** @param {Creep} creep **/
    run: function(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
};

module.exports = towerAttack;