# BunnyCDNStorage 

BunnyCDNStorageAPI is a Node.js class for interacting with the BunnyCDN Storage API using Fetch.

## Installation

To use BunnyCDNStorage in your Node.js project, you can add it as a dependency in your `package.json` file:

```bash
npm install github:realview/BunnyCDNStorageAPI
```
## USAGE

```typescript

import bunnyCDNStorage from 'bunny-cdn-storage-api'
import fs from 'fs'

  // Initialize BunnyCDNStorage with your API key and storage zone name
  const storage = new BunnyCDNStorage('your-api-key', 'your-storage-zone','your-region');


    // List files in the root directory
    let listResponse = await storage.list();
    console.log('Files in the root directory:', listResponse.data);

    // Upload a file biffer
    let filePath = '/path/to/your/file.txt';
    let buffer = fs.readFileSync(filePath)
    let remotePath = 'folder/file.txt'; 
    let uploadResponse = await storage.upload(buffer, remotePath);
    console.log('File uploaded successfully:', uploadResponse.data);

    // Upload from remote URL

    let imageUrl = "https://url-to-image.com/image.jpg"
   
    uploadResponse = await storage.uploadFromUrl(imageUrl, remotePath);
    console.log('File uploaded successfully:', uploadResponse.data);

    // Download a file
    let downloadPath = 'folder/file.txt';
    let downloadResponse = await storage.download(downloadPath);
    // Handle the downloaded file

    // Delete a file
    let deletePath = 'folder/file.txt';
    let deleteResponse = await storage.delete(deletePath);
    console.log('File deleted successfully:', deleteResponse.data);
 
```


