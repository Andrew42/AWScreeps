var changeHome = {
    /** @param {Creep} creep **/
    run: function(creep,new_home) {
        creep.say('new home');
        creep.memory.home = new_home;
    }
};

module.exports = changeHome;