export default interface ApprovalData {
    id: number; // Primary key for the "approval" table
    fromId: number; // Foreign key referencing the "from" table
    toId: number; // Foreign key referencing the "to" table
    packageId: number; // Foreign key referencing the "package" table
    sizeId: number; // Foreign key referencing the "size" table
}
