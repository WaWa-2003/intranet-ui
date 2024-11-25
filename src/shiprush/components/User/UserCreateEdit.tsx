import React from "react";
import UserData from "../../data/UserData";

interface UserCreateEditProps {
    editingUserData: Partial<UserData> | null; 
    setEditingUserData: React.Dispatch<React.SetStateAction<UserData | null >>; 
    onDataAdded: () => void; 
}

const UserCreateEdit: React.FC<UserCreateEditProps> = ({
    editingUserData, setEditingUserData, onDataAdded
}) => {

    const [newUserData, setNewUserData] = useState<Omit<UserData,"id">> ({
        name: "", 
        position: "",
        department: "",
        email: "", 
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 

    const addUserData = async () => {
        if(!newUserData.name || !newUserData.position || !newUserData.department || !newUserData.email) {
            alert("Please fill in all the required fields.");
            return; 
        }

        setIsSubmitting(true); 

        try {
            const 
        } catch (error) {
            
        } finally {

        }
    }
}

export default UserCreateEdit; 