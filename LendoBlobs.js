const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()

async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');

    const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=contadearmazenamento42;AccountKey=jMcpMSuUF+w2lDbUyqK70KlCNJMCvan0/4NXCGM6jsungc8ccVCfRUvRZ0IzptHqJlA+Niy1XNyV+ASt/Ye5TQ==;EndpointSuffix=core.windows.net"

    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
    // Create a unique name for the container
    const containerName = "container-faccat"

    console.log("\nCreating container...");
    console.log("\t", containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    console.log("\nListing blobs...");

    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log("\t", blob.name);
    }

}

main()
    .then(() => console.log('Done'))
    .catch((ex) => console.log(ex.message));