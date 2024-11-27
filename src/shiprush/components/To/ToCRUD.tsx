import React, { useState, useEffect } from 'react';
import ToData from '../../data/ToData';
import ToList from './ToList_RetrieveDelete';
import ToCreateEdit from './ToCreateEdit';
import { getToData, deleteToData } from '../../../services/toService';

const ToCRUD: React.FC = () => {
  const [toList, setToList] = useState<ToData[]>([]);
  const [editingData, setEditingData] = useState<ToData | null>(null);

  useEffect(() => {
    const fetchToList = async () => {
      try {
        const data = await getToData(); // Fetch data
        setToList(data); // Set state with fetched data
      } catch (error) {
        console.error('Error fetching ToData: ', error);
        alert('Failed to load ToData.');
      }
    };

    fetchToList(); // Initial fetch
  }, []);

  const refreshToList = async () => {
    try {
      const data = await getToData(); // Fetch updated data
      setToList(data); // Update state
    } catch (error) {
      console.error('Frontend - Error fetching ToData: ', error);
      alert('Failed to refresh ToData.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteToData(id); // Delete item via service
      setToList((prevList) => prevList.filter((item) => item.id !== id)); // Update state
      alert('Successfully deleted the To Data.');
    } catch (error) {
      console.error('Error deleting To Data: ', error);
      alert('Failed to delete To Data.');
    }
  };

  const startEditing = (toData: ToData) => {
    console.log('Editing data triggered:', toData); // Debug log
    setEditingData(toData); // Set data for editing
  };

  return (
    <div className="flex">
      <ToCreateEdit
        editingToData={editingData}
        setEditingToData={setEditingData}
        onDataAdded={refreshToList}
      />
      <div>
        <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
          To Data List
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {toList.length > 0 ? (
            toList.map((item) => (
              <ToList
                key={item.id}
                {...item}
                onDelete={handleDelete}
                startEditing={startEditing}
              />
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToCRUD;
