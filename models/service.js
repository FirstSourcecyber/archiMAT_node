module.exports = (sequelize, type) => {
    return sequelize.define('service', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        desc: type.TEXT,
        image: type.STRING,
        status: type.BOOLEAN,
    })
}