module.exports=(sequelize, DataTypes) =>{
    return sequelize.define('user', {
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
           
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
  
    })
    

}

//When I test this in pg admin allowNull isn't working