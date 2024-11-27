import { useState, useEffect } from 'react';
import { getRequests, deleteRequest } from '../../../services/requestService';

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getRequests();
                setRequests(data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleToSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedToId(parseInt(event.target.value, 10));
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteRequest(id);
            setRequests((prev) => prev.filter((req) => req.id !== id));
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Requests</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.fromData?.company || 'N/A'}</td>
                            <td>{request.toData?.company || 'N/A'}</td>
                            <td>{request.status || 'Pending'}</td>
                            <td>
                                <button onClick={() => handleDelete(request.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestList;
