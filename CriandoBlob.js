const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()

async function main() {

    //variavel abaixo deve informar a cadeia de conexao do container
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

    const blobName = "quickstart"  + ".txt";

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log("\nUploading to Azure storage as blob:\n\t", blobName);

    // Upload data to the blob
    const data = "Hello, World!";
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(
        "Blob was uploaded successfully. requestId: ",
        uploadBlobResponse.requestId
    );


}

main()
    .then(() => console.log('Done'))
    .catch((ex) => console.log(ex.message));