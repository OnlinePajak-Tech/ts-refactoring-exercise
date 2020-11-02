export interface IDataBaseInteractor {
    save(session: IIntegrationSession): void
}
export interface IIntegrationSession {
    id: string,
    source: string,
    status: string
}

export class DataBaseInteractor implements IDataBaseInteractor {
    save(session: IIntegrationSession): void {
        //NOT IMPLEMENTED
    }
}
