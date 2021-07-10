module.exports = (sequelize, type) => {
    return sequelize.define('socialLinks', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        link: type.STRING
    })
}