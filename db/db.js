import  Sequelize  from "sequelize";

export const sequelize = new Sequelize( 'tusena','postgres','1007524913',{
host:'localhost',
dialect:'postgres'
})