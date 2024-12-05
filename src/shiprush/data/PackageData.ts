import RequestData from "./RequestData";

export default interface PackageData {
    id: number;
    requestId?: number; // Mark as optional
    requestData?: RequestData; // Mark as optional
    packaging: string;
    weight: number;
    weightUnitType: string;
    declaredValue: number;
    currency: string;
    height: number;
    heightUnitType: string;
    width: number;
    widthUnitType: string;
    length: number;
    lengthUnitType: string;
}
