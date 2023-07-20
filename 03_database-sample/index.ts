import MaxAPI from 'max-api';
import MongoDBClientManager from "./mongodb-client-manager";

const soundFileCollection = 'soundFiles';

const main = async () => {
    const manager = new MongoDBClientManager();
    try {
        const db = await manager.getDb();
        const soundFiles = await db.collection(soundFileCollection).find({}).toArray();
        const soundFilePathList: string[] = [];
        soundFiles.forEach(soundFile => {
            soundFilePathList.push(`${soundFile.path}/${soundFile.fileName}`);
        });
        MaxAPI.outlet(soundFilePathList);
        await manager.close();
    } catch(e) {
        throw e;
    }
}

(async () => {
    await main();
})();