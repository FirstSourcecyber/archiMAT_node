module.exports = (sequelize, type) => {
    return sequelize.define('shop', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        email: type.STRING,
        phone: type.STRING,
        address: type.STRING,
        city: type.STRING,
        desc: type.STRING,
        address: type.STRING,
        website: type.STRING,
        fb: type.STRING,
        twitter: type.STRING,
        opening_hours: type.STRING,
        image: type.STRING,
        virtual_mall:type.STRING,
        virtual_showroom:type.STRING,
        status: type.BOOLEAN
    })
}