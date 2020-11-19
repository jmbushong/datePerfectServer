module.exports=(sequelize, DataTypes) => {
    const Profile= sequelize.define('profile', {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type:DataTypes.STRING
        },
        location: {
            type:DataTypes.STRING
        },
        interestedIn: {
            type:DataTypes.STRING
        },
        gender: {
            type:DataTypes.STRING
        },
        dateType:{
            type:DataTypes.STRING
        },
        cuisine:{
            type:DataTypes.STRING
        },
        picURL:{
            type:DataTypes.STRING
        },
        bio:{
            type:DataTypes.STRING
        },
        hobbies:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        owner: {
            type:DataTypes.INTEGER
        }
    
        
        
        
    })
    return Profile
}