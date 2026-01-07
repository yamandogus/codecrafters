import { ProfileUser } from "../types";
import ContactEditor from "./ContactEditor";

interface ProfileContactProps {
  user: ProfileUser;
  isEditable?: boolean;
  onUpdate?: (user: ProfileUser) => void;
}

export default function ProfileContact({ user, isEditable = false, onUpdate }: ProfileContactProps) {
  const handleUpdate = (updatedUser: ProfileUser) => {
    if (onUpdate) {
      onUpdate(updatedUser);
    }
  };

  return (
    <ContactEditor 
      user={user} 
      isEditable={isEditable} 
      onUpdate={handleUpdate}
    />
  );
}
