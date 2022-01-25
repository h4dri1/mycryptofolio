const db = require('../database');

class Wallet {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async findOne(id) {
        try {

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async save() {
        try {

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(id) {
        try {

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Wallet;