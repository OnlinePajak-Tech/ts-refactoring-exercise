export interface ISftpTransport {
    connect(): void

    read(filePath: String): String

    write(filePath: String, data: String): void

    disconnect(): void
}

export class SftpTransport implements ISftpTransport {
    connect(): void {
        // NOT IMPLEMENTED
    }

    read(filePath: String): String {
        // NOT IMPLEMENTED. Should return the contents of the file under the filePath
        return "";
    }

    write(filePath: String, data: String): void {
        // NOT IMPLEMENTED
    }

    disconnect(): void {
        // NOT IMPLEMENTED
    }
}
