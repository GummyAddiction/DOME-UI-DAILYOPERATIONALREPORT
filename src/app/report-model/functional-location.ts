export interface FunctionalLocation {
    functionallocationid: number, 
    name: string, 
    createdby: string,
    createddate: string,
    updateby: string,
    updatedate: string
    // ?: ----> nullable operator
}

export class FunctionalLocationModel {
    
    constructor(
    public functionallocationid: number, 
    public name: string, 
    public createdby: string,
    public createddate: string,
    public updateby: string,
    public updatedate: string
    ){}
}
