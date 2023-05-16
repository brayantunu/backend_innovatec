import  Sequelize  from "sequelize";
// import { Pool } from "pg";
export const sequelize = new Sequelize( 'tusena1','postgres','0000',{
host:'localhost',
dialect:'postgres'
})

// export const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'tusena',
//     password: '0000',
//     port: 5432,
//   });