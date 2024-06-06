"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultBaseUrl = 'https://storage.bunnycdn.com';
class BunnyCDNStorage {
    apiKey;
    storageZoneName;
    region;
    constructor(apiKey, storageZoneName, region) {
        this.apiKey = apiKey;
        this.storageZoneName = storageZoneName;
        this.region = region;
    }
    async fetchRequest(url, method, body) {
        const requestOptions = {
            method: method,
            headers: {
                AccessKey: this.apiKey
            },
            body: body
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}. Status: ${response.status} ${response.statusText}`);
        }
        return response;
    }
    list(path) {
        const url = this.buildUrl(path);
        return this.fetchRequest(url, 'GET');
    }
    delete(path) {
        const url = this.buildUrl(path);
        return this.fetchRequest(url, 'DELETE');
    }
    async upload(fileBuffer, remotePath) {
        const url = this.buildUrl(remotePath);
        return this.fetchRequest(url, 'PUT', fileBuffer);
    }
    async uploadFromUrl(url, remotePath) {
        try {
            let res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Failed to fetch file from URL: ${url}. Status code: ${res.status}`);
            }
            let fileArrayBuffer = await res.arrayBuffer();
            const fileBuffer = Buffer.from(fileArrayBuffer);
            return this.upload(fileBuffer, remotePath);
        }
        catch (error) {
            throw new Error(`Failed to fetch file from URL: ${url}. Error: ${error}`);
        }
    }
    download(filePath) {
        const url = this.buildUrl(filePath);
        return fetch(url);
    }
    buildUrl(path) {
        const baseURL = this.region ? `https://${this.region}.storage.bunnycdn.com` : defaultBaseUrl;
        const storageURL = `${baseURL}/${this.storageZoneName}`;
        return path ? `${storageURL}/${path}` : storageURL;
    }
}
exports.default = BunnyCDNStorage;
