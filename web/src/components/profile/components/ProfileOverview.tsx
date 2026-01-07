import { ProfileUser } from "../types";
import AboutEditor from "./AboutEditor";
import SkillsEditor from "./SkillsEditor";
import AchievementsEditor from "./AchievementsEditor";

interface ProfileOverviewProps {
  user: ProfileUser;
  isEditable?: boolean;
  onUpdate?: (user: ProfileUser) => void;
}

export default function ProfileOverview({ user, isEditable = false, onUpdate }: ProfileOverviewProps) {
  const handleUpdate = (updatedUser: ProfileUser) => {
    if (onUpdate) {
      onUpdate(updatedUser);
    }
  };

  return (
    <div className="space-y-6">
      <AboutEditor 
        user={user} 
        isEditable={isEditable} 
        onUpdate={handleUpdate}
      />
      <SkillsEditor 
        user={user} 
        isEditable={isEditable} 
        onUpdate={handleUpdate}
      />
      <AchievementsEditor 
        user={user} 
        isEditable={isEditable} 
        onUpdate={handleUpdate}
      />
    </div>
  );
}
