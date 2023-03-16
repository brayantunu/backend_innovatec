import  Sequelize  from "sequelize";

export const sequelize = new Sequelize( 'test_innovatec','postgres','1007524913',{
host:'localhost',
dialect:'postgres'
})