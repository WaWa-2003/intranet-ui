import React from "react";
import FromData from "../../data/FromData";

const FromList: React.FC<FromData> = (props) => {
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
        From Data List
      </h2>
      <div className="fromData--list">
        <p className="fromData--list-p">
          <span className="bold">ID - </span> {props.id}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Company Name - </span> {props.company}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Person Name - </span> {props.personName}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Phone - </span> {props.phone}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Email Address - </span> {props.emailAddress}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Address - </span> {props.address}
        </p>
        <p className="fromData--list-p">
          <span className="bold">City - </span> {props.city}
        </p>
        <p className="fromData--list-p">
          <span className="bold">ZIP - </span> {props.zip}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Country - </span> {props.country}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Residential - </span> {props.residential}
        </p>
        <p className="fromData--list-p">
          <span className="bold">Tax ID - </span> {props.taxId}
        </p>
        <p className="fromData--list-p">
          <span className="bold">EORI Destination - </span> {props.eoriDestination}
        </p>
      </div> 
    </div> 

  );
};

export default FromList;
