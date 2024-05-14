const defaultBaseUrl = 'https://storage.bunnycdn.com';
export default class BunnyCDNStorage {
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
