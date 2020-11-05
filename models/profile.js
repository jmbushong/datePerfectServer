module.exports=(sequelize, DataTypes) => {
    const Profile= sequelize.define('profile', {
        name: {
            type: DataTypes.STRING
        },
        age: {
            type:DataTypes.INTEGER
        },
        interestedIn: {
            type:DataTypes.STRING
        },
        activities: {
            type:DataTypes.STRING
        },
        food: {
            type:DataTypes.STRING
        }
        
        
    })
    return Profile
}