module.exports = (sequelize, type) => {
    return sequelize.define('images', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: type.STRING,
    })
}