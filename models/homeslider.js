module.exports = (sequelize, type) => {
    return sequelize.define('homeslider', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        image: type.STRING,
        type: type.STRING,
    })
}