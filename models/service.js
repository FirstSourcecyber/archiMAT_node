module.exports = (sequelize, type) => {
    return sequelize.define('service', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        image: type.STRING,
        status: type.BOOLEAN,
    })
}