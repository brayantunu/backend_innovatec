import  Sequelize  from "sequelize";
// import { Pool } from "pg";

export const sequelize = new Sequelize( 'final','postgres','1007524913',{
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