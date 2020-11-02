import {SftpTransport} from "./services/SftpTransport";
import {MessagePublisher} from "./services/MessagePublisher";
import {DataBaseInteractor} from "./services/DataBaseInteractor";
import {AwsS3Transport} from "./services/AwsS3Transport";

//todo: refactor the class to follow best practices, e.g. SOLID and/or Functional Programming principles
export class Integration {
    public static handleIntegration(data: any): void {
        if (data['source'] !== null) {
            if (data['source'] == 'sftp') {
                const sftpTransport = new SftpTransport()
                sftpTransport.connect()
                const sftpFile = sftpTransport.read(data['fileDir'] + '/' + data['fileName'])
                if (sftpFile != null) {
                    const parsedFile = new Integration().parseSftpFile(data['fileName'], sftpFile)
                    const headers = parsedFile.shift()
                    const lines = parsedFile
                    const nonEmptyLines: any[] = []
                    lines.forEach((line: any) => {
                        if (line === '') {
                            nonEmptyLines.push(line)
                        }
                    })
                    new Integration().storeSftpIntegrationSessionInDB(parsedFile)
                    const publisher = new MessagePublisher()
                    publisher.publish({
                        event_name: 'sftp_integration_data',
                        payload: {
                            headers,
                            lines: nonEmptyLines
                        }
                    })
                } else {
                    throw new Error('Integration source is empty!')
                }
                sftpTransport.disconnect()
            }
            if (data['source'] == 's3') {
                const s3Transport = new AwsS3Transport()
                const s3File = s3Transport.read(data['bucket'], data['prefix'] + '/' + data['fileName'])
                if (s3File != null) {
                    const parsedFile = new Integration().parseSftpFile(data['fileName'], s3File)
                    const headers = parsedFile.shift()
                    const lines = parsedFile
                    const nonEmptyLines: any[] = []
                    lines.forEach((line: any) => {
                        if (line === '') {
                            nonEmptyLines.push(line)
                        }
                    })
                    new Integration().storeS3IntegrationSessionInDB(parsedFile)
                    const publisher = new MessagePublisher()
                    publisher.publish({
                        event_name: 's3_integration_data',
                        payload: {
                            bucket: data['bucket'],
                            prefix: data['prefix'],
                            fileName: data['fileName'],
                            headers,
                            lines: nonEmptyLines,
                        }
                    })
                } else {
                    throw new Error('Integration source is empty!')
                }
            }
        }
    }

    parseSftpFile(fileName: string, data) {
        if (fileName.endsWith('.csv')) {
            let dataLines = data.split('\n')
            return dataLines.map((line) => line.split(data['separator'] !== null ? data['separator'] : ','))
        }
    }

    storeSftpIntegrationSessionInDB(data) {
        if (data['request_id'] != null) {
            new DataBaseInteractor().save({
                id: data['request_id'],
                source: 'sftp',
                status: 'NEW'
            })
        }
    }

    storeS3IntegrationSessionInDB(data) {
        if (data['request_id'] != null) {
            new DataBaseInteractor().save({
                id: data['request_id'],
                source: 's3',
                status: 'NEW'
            })
        }
    }

}
