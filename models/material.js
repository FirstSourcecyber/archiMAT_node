module.exports = (sequelize, type) => {
    return sequelize.define('material', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        code: type.STRING,
        currency: type.STRING,
        price: type.STRING,
        brand: type.STRING,
        color: type.STRING,
        country: type.STRING,
        image: type.STRING,
        status: type.BOOLEAN,
    })
}