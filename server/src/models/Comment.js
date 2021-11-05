module.exports = ( sequelize, DataTypes ) => {
    const Comment = sequelize.define('Comment', {
      nreviwe: DataTypes.STRING,
      date: DataTypes.DATE,
      content: DataTypes.STRING,
      pictures: DataTypes.STRING,
      thumbnail:DataTypes.STRING
    })
    return Comment
  }