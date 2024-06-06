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

  async uploadFromUrl(url: string, remotePath?: string) {
    try {
      let res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch file from URL: ${url}. Status code: ${res.status}`);
      }
      let fileArrayBuffer = await res.arrayBuffer()
      const fileBuffer: Buffer = Buffer.from(fileArrayBuffer)
      return this.upload(fileBuffer, remotePath);
    } catch (error) {
      throw new Error(`Failed to fetch file from URL: ${url}. Error: ${error}`);
    }
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
