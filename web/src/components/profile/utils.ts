export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long'
  });
};

export const getSkillLevelColor = (level: string) => {
  switch (level) {
    case 'Expert': return 'bg-green-500';
    case 'Advanced': return 'bg-blue-500';
    case 'Intermediate': return 'bg-yellow-500';
    case 'Beginner': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};
