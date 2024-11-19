export default interface PackageData {
    id: number; // Primary key for the "package" table
    packaging: string;
    weight: number;
    weightUnitType: string;
    declaredValue: number;
    currency: string;
}
