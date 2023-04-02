import { sequelize } from "./db/db.js";
import app from "./app.js";




async function main(){
    try {
        await sequelize.sync({force:false})
        app.listen(3000)
        console.log("el proyecto y la base de datos estan conectados");

    } catch (error) {
        console.log('no hay conecxion con la base de datos',error);
    }
}

main()