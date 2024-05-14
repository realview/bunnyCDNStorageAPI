const defaultBaseUrl: string = 'https://storage.bunnycdn.com';

export default class BunnyCDNStorage {
  private apiKey: string;
  private storageZoneName: string; 
  private region?: string;

  constructor(apiKey: string, storageZoneName: string, region?: string) {
    this.apiKey = apiKey;
    this.storageZoneName = storageZoneName;
    this.region = region;
  }

  private async fetchRequest(url: string, method: string, body?: BodyInit) {
    const requestOptions: RequestInit = {
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

  list(path?: string) {
    const url = this.buildUrl(path);
    return this.fetchRequest(url, 'GET');
  }

  delete(path?: string) {
    const url = this.buildUrl(path);
    return this.fetchRequest(url, 'DELETE');
  }

  async upload(fileBuffer: Buffer | string, remotePath?: string) {
    const url = this.buildUrl(remotePath);
    return this.fetchRequest(url, 'PUT', fileBuffer);
  }

  download(filePath: string) {
    const url = this.buildUrl(filePath);
    return fetch(url);
  }



  private buildUrl(path?: string) {
    const baseURL = this.region ? `https://${this.region}.storage.bunnycdn.com` : defaultBaseUrl;
    const storageURL = `${baseURL}/${this.storageZoneName}`;
    return path ? `${storageURL}/${path}` : storageURL;
  }
}
