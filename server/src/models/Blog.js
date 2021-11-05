module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
      name: DataTypes.STRING,
      tel: DataTypes.STRING,
      datebook: DataTypes.DATE,
      timebook: DataTypes.TIME,
      nump:DataTypes.STRING,
      tableno: DataTypes.STRING,
      packet:DataTypes.STRING,
      time: DataTypes.STRING
    })

    return Blog
}