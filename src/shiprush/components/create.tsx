import React, { useState } from "react";
import ApprovalData from "../data/approvalData";

const Create: React.FC = () => {
    const [approval, setApproval] = useState<ApprovalData>({
        id: 0,
        fromId: 0,
        toId: 0,
        packageId: 0,
        sizeId: 0,
    });

  return (
    <div>
      <h1>Create Approval</h1>
      
    </div>
  );
};

export default Create;
