import FromData from "./FromData";
import ToData from "./ToData";
import UserData from "./UserData";

export default interface RequestData {
  id: number;
  fromId: number;
  toId: number;
  remarkByRequestor?: string; // Optional, as it could be null
  remarkBySupervisor?: string; // Optional, as it could be null
  remarkByLogistic?: string; // Optional, as it could be null
  status?: string; // Optional, as it could be null
  requestorId?: number; // Optional, as it could be null
  supervisorId?: number; // Optional, as it could be null
  logisticId?: number; // Optional, as it could be null
  createdById: number;
  modifiedById?: number; // Optional, as it could be null
  createdDateTime: Date;
  modifiedDateTime?: Date; // Optional, as it could be null

  // Relationships
  fromData?: FromData; // Link to the FromData table
  toData?: ToData; // Link to the ToData table
  requestor?: UserData; // Link to the UserData table as the requestor
  supervisor?: UserData; // Link to the UserData table as the supervisor
  logistic?: UserData; // Link to the UserData table as the logistic handler
}
