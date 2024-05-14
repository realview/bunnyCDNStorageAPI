# BunnyCDNStorage 

BunnyCDNStorage is a Node.js class for interacting with the BunnyCDN Storage API using Fetch.

## Installation

To use BunnyCDNStorage in your Node.js project, you can add it as a dependency in your `package.json` file:

```bash
npm install github:realview/BunnyCDNStorage
```
## USAGE

```javascript

import BunnyCDNStorage from 'BunnyCDNStorage';

async function main() {
  // Initialize BunnyCDNStorage with your API key and storage zone name
  const storage = new BunnyCDNStorage('your-api-key', 'your-storage-zone');

  try {
    // List files in the root directory
    const listResponse = await storage.list();
    console.log('Files in the root directory:', listResponse.data);

    // Upload a file
    const filePath = '/path/to/your/file.txt';
    const remotePath = 'folder/file.txt'; // Optional: Remote path to upload the file to
    const uploadResponse = await storage.upload(filePath, remotePath);
    console.log('File uploaded successfully:', uploadResponse.data);

    // Download a file
    const downloadPath = 'folder/file.txt';
    const downloadResponse = await storage.download(downloadPath);
    // Handle the downloaded file

    // Delete a file
    const deletePath = 'folder/file.txt';
    const deleteResponse = await storage.delete(deletePath);
    console.log('File deleted successfully:', deleteResponse.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```


