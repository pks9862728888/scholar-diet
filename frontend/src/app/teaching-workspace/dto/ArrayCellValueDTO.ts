export interface ArrayCellValueDTO {
    // Specifies array number because there can be multiple arrays in DOM
    componentRef: string;
    arrayCellIdx: number;
    value: string;
}