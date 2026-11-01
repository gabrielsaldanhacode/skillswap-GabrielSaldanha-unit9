const { filterSkillsByCategory, calculateTotalCost } = require('../skillswap-functions');

describe('filterSkillsByCategory function', () => {
    const skills = [
        { title: 'Python Tutoring', category: 'Programming', price: 20 },
        { title: 'Guitar Lessons', category: 'Music', price: 15 },
        { title: 'Resume Review', category: 'Career', price: 0 },
        { title: 'Web Development', category: 'Programming', price: 25 }
    ];

    test('should return only skills matching the given category', () => {
        const result = filterSkillsByCategory(skills, 'Programming');
        expect(result).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'Web Development', category: 'Programming', price: 25 }
        ]);
    });

    test('should return all skills when category is "All"', () => {
        const result = filterSkillsByCategory(skills, 'All');
        expect(result).toEqual(skills);
    });

    test('should return an empty array if no skills match', () => {
        const result = filterSkillsByCategory(skills, 'Cooking');
        expect(result).toEqual([]);
    });
});

describe('calculateTotalCost function', () => {
    test('should return correct total cost for standard rates and hours', () => {
        expect(calculateTotalCost(20, 2)).toBe(40);
    });

    test('should return 0 for free sessions', () => {
        expect(calculateTotalCost(0, 3)).toBe(0);
    });

    test('should return 0 when hours requested is 0', () => {
        expect(calculateTotalCost(20, 0)).toBe(0);
    });

    test('should handle decimal hours correctly', () => {
        expect(calculateTotalCost(25, 1.5)).toBe(37.5);
    });
});