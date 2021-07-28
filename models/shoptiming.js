module.exports = (sequelize, type) => {
    return sequelize.define('shopTime', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: type.STRING,
        opentime: type.STRING,
        closetime: type.STRING,
    })
}