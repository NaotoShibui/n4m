import { request } from 'undici';

export default class MetropolitanMuseumApiClient {
    async fetchObject(objectId: string | number): Promise<string> {
        const url = `${process.env.METROPOLITAN_API_BASE_URL}/public/collection/v1/objects/${objectId}`;
        const method = 'GET';
        // undici を利用して、メトロポリタン美術館APIのObjectAPIを叩く
        const response = await request(url, {
            method
        });
        return await response.body.text();
    }
}