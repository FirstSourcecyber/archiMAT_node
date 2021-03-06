module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        price: type.STRING,
        desc: type.TEXT,
        stock: type.INTEGER,
        size: type.STRING,
        currency: type.STRING,
        productCode: type.STRING,
        isvirtual:type.BOOLEAN,
        color: type.STRING,
        status: type.BOOLEAN
    })
}