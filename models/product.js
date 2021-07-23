module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        price: type.STRING,
        desc: type.STRING,
        stock: type.INTEGER,
        size: type.STRING,
        image: type.STRING,
        productCode: type.STRING,
        isfeature:type.BOOLEAN,
        status: type.BOOLEAN
    })
}