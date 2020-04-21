const Sequelize = require('sequelize');

async function start() {
    const sequelize = new Sequelize('haha', 'root', 'dingjia3113', {
        host: 'localhost',
        dialect: 'mysql'
    });

    const Fruit = sequelize.define('Fruit', {
        name: {type: Sequelize.STRING(20), allowNull: false},
        price: {type: Sequelize.FLOAT, allowNull: false}
    });

    const ret = await Fruit.sync();
}

start();
