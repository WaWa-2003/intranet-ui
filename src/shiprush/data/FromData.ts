export default interface FromData {
    id: number; // Primary key for the "from" table
    company: string;
    personName: string;
    phone: string;
    emailAddress: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    residential: string;
    taxId: string;
    eoriDestination: string;
}