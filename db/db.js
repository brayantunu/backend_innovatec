import  Sequelize  from "sequelize";

export const sequelize = new Sequelize( 'tusena','postgres','0000',{
host:'localhost',
dialect:'postgres'
})
