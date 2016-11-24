var structLink = {

    /** @param {Creep} creep **/
    run: function(link) {
        var storage_link_id = link.room.memory.storage_link_id
        if (link.id != storage_link_id && link.energy > 750) {
            link.transferEnergy(Game.getObjectById(storage_link_id));
        }
    }
};

module.exports = structLink;