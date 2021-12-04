module.exports = (sequelize, type) => {
    return sequelize.define('company', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        email: type.STRING,
        phone: type.STRING,
        desc: type.TEXT,
        experience_years: type.STRING,
        image: type.STRING,
        link: type.STRING,
        status: type.BOOLEAN
    })
}