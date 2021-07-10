module.exports = (sequelize, type) => {
    return sequelize.define('shop_type', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        image: type.STRING,
    })
}