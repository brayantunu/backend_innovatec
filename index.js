import { sequelize } from "./db/db.js";
import app from "./app.js";
async function main(){
    try {
        await sequelize.sync({force:true})
        app.listen(3000)
        console.log("All models were synchronized successfully.");

    } catch (error) {
        console.log('no hay conecxion con la base de datos',error);
    }
}
main()
