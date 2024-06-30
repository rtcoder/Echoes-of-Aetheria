class PlayerEquipmentClass {
    #values = [];

    findItem(item) {
        if (item.id) {
            return this.getById(item.id);
        }
        if (item.type) {
            return this.getByType(item.type);
        }
        return null;
    }

    getById(id) {
        this.#values.find(item => item.id === id);
    }

    getByType(type) {
        this.#values.find(item => item.type === type);
    }

    addItems(...items) {
        this.#values.push(...items);
    }
}

export const PlayerEquipment = new PlayerEquipmentClass();
