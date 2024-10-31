import { FromInputData } from '../../data/FromInputData';

interface FromDataShowProps {
  data: FromInputData;
}

export default function FromDataShow({ data }: FromDataShowProps) {
  return (
    <div>
      <h4>{data.nickname}</h4>
      <p>Company: {data.company}</p>
      <p>Contact Name: {data.contact_name}</p>
      <p>Phone: {data.phone}</p>
      <p>Address: {data.address}, {data.city}, {data.country}</p>
      {data.zip && <p>ZIP: {data.zip}</p>}
      {data.tax_id && <p>Tax ID: {data.tax_id}</p>}
    </div>
  );
} 