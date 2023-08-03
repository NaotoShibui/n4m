import { default as MaxAPI } from 'max-api';
import MongoDBClientManager from "./mongodb-client-manager";

const main = async () => {    
    const manager = new MongoDBClientManager();
    const db = await manager.getDb();
    const supplierList = await db.collection('gdcArchive').distinct('supplier', {});
    MaxAPI.outlet(supplierList);
    await manager.close();
}

(async () => {
    await main();
})();