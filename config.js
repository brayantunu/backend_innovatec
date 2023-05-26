
// export default{
//     SECRET: 'funcionario',
//     development: {
//         username: 'postgres',
//         password: '1007524913',
//         database: 'final',
//         host: 'localhost',
//         dialect: 'postgres'
//       },

// }

import {config} from 'dotenv'

config()

export const PORT = process.env.PORT
export const DB_PORT = process.env.DB_PORT
export const DB_USER = process.env.DB_USER || 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD || '1007524913'
export const DB_DATABASE = process.env.DB_DATABASE || 'final'
export const DB_HOST = process.env.DB_HOST

// console.log(DB_HOST)