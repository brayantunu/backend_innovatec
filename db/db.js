import  Sequelize  from "sequelize";

export const sequelize = new Sequelize( 'tusena1','postgres','0000',{
host:'localhost',
dialect:'postgres'
})
