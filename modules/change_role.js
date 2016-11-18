var changeRole = {
    /** @param {Creep} creep **/
    run: function(creep,new_role) {
        creep.say('to '+new_role);
        creep.memory.role = new_role;
    }
};

module.exports = changeRole;