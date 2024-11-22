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

}

export default UserCreateEdit; 