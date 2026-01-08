export function mapSkillLevel(level) {
    const upperLevel = level.toUpperCase();
    if (upperLevel === 'BEGINNER')
        return 'BEGINNER';
    if (upperLevel === 'INTERMEDIATE')
        return 'INTERMEDIATE';
    if (upperLevel === 'ADVANCED')
        return 'ADVANCED';
    if (upperLevel === 'EXPERT')
        return 'EXPERT';
    return 'BEGINNER'; // default
}
