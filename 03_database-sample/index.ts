import { default as MaxAPI, default as MaxAPIStatic } from 'max-api';
import MongoDBClientManager from "./mongodb-client-manager";
import { Filter, dataProperties } from './types/SoundArchive';

const main = async () => {    
    const manager = new MongoDBClientManager();
    MaxAPI.addHandler(MaxAPIStatic.MESSAGE_TYPES.DICT, async (...args: {[key: string]: string | number | boolean}[]) => {
		const filter: Partial<Filter> = {};
        const filterSet = new Set(dataProperties);
        for (const [key, value] of Object.entries(args[0])) {
            if(filterSet.has(key)) Object.assign(filter, {[key]: value});
        }
		console.log(filter);

        try {
            const db = await manager.getDb();
            const soundFiles = await db.collection('gdcArchive').find(filter).toArray();
			console.log(soundFiles);
            const soundFilePathList: string[] = [];
            soundFiles.forEach(soundFile => {
                soundFilePathList.push(soundFile.fileName);
            });
            MaxAPI.outlet(soundFilePathList);
            await manager.close();
        } catch(e) {
            console.log((e as any).message);
            throw e;
        }
    });
}

(async () => {
    await main();
})();