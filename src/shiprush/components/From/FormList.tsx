import React from "react";
import FromData from "../../data/FromData";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../url/url";

const FromList: React.FC<FromData & { onDelete: (id: number) => void }> = (props) => {
  const navigate = useNavigate();

  const deleteFromData = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/shiprush/fromdata/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete.');
      }
      alert('Successfully Deleted!');
      props.onDelete(id); // Update the parent component's state
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };



  return (
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
      <div>
        <button
          type="button"
          onClick={() => navigate(`/fromedit/${props.id}`)}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => deleteFromData(props.id)}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FromList;
