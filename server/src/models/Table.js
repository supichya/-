module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
    tablenum: DataTypes.STRING,
    poeple: DataTypes.STRING,
    stove: DataTypes.STRING,
    pictures: DataTypes.STRING,
    thumbnail:DataTypes.STRING
    })

    return Table
}