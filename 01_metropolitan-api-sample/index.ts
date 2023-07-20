require('dotenv').config();
import MaxAPI from 'max-api';
import readline from 'readline';
import MetropolitanMuseumApiClient from './api-client/metropolitan-museum-api-client';

const apiClient = new MetropolitanMuseumApiClient();

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
})

// 標準入力に入力があるたびに実行される。
rl.on('line', async (line: string): Promise<void> => {
    // API実行
    const response = await apiClient.fetchObject(line);
    // node.scriptオブジェクトのアウトレットからレスポンスを出力する。
    await MaxAPI.outlet(JSON.parse(response));
});
