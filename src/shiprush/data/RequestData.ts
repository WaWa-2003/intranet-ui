import FromData from "./FromData";
import ToData from "./ToData";
export default interface RequestData {
  id: number;
  fromId: number;
  toId: number;
  remarkByRequestor?: string;  
  remarkBySupervisor?: string;  
  remarkByLogistic?: string;  
  status?: string;  
  requestorEmail?: string;
  supervisorEmail?: string;
  logisticEmail?: string;
  createdByEmail: string;
  modifiedByEmail?: string;  
  createdDateTime: Date;
  modifiedDateTime?: Date;  

  // Relationships
  fromData?: FromData; // Link to the FromData table
  toData?: ToData; // Link to the ToData table   
}
