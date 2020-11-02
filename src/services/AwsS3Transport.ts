export interface IAwsS3Transport {
    read(bucketName: String, filePath: String): String

    write(bucketName: String, filePath: String, data: String): void
}

export class AwsS3Transport implements IAwsS3Transport {
    read(bucketName: String, filePath: String): String {
        // NOT IMPLEMENTED. Should return the contents of the file under the filePath
        return "";
    }

    write(bucketName: String, filePath: String, data: String): void {
        // NOT IMPLEMENTED
    }

}
