import { MongoClient, type Db } from "mongodb";

export default class MongoDBClientManager {

    private readonly username = 'node-for-max';
    private readonly password = 'n4m';
    private readonly database = 'node-for-max';
    private mongoClient: MongoClient;
    private connected = false;

    constructor() {
        this.mongoClient = new MongoClient(`mongodb://${this.username}:${this.password}@localhost:27017`);
    }

    async getDb(): Promise<Db> {
        await this.connect();
        return this.mongoClient.db(this.database);
    }

    private async connect(): Promise<void> {
        if(this.mongoClient && this.connected) return;

        this.mongoClient?.on('open', () => {
            this.connected = true;
        });
        this.mongoClient?.on('topologyClosed',  () => {
            this.connected = false;
        });
        await this.mongoClient.connect();
    }

    async close(): Promise<void> {
        await this.mongoClient.close();
        this.connected = false;
    }
}

