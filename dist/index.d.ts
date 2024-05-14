/// <reference types="node" />
export default class BunnyCDNStorage {
    private apiKey;
    private storageZoneName;
    private region?;
    constructor(apiKey: string, storageZoneName: string, region?: string);
    private fetchRequest;
    list(path?: string): Promise<Response>;
    delete(path?: string): Promise<Response>;
    upload(fileBuffer: Buffer | string, remotePath?: string): Promise<Response>;
    download(filePath: string): Promise<Response>;
    private buildUrl;
}
