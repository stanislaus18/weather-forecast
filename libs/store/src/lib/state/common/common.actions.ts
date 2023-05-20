export class GetUsStateCapitals {
    static readonly type = '[GetUsStateCapitals] details';
}

export class SetPlace {
    constructor(public place: string, public longitude: string, public latitude: string) { }
    static readonly type = '[SetPlace] for application';
}
