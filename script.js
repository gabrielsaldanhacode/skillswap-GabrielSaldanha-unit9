// 1. Pure function copied from skillswap-functions.js
function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }
  return skills.filter(skill => skill.category === category);
}

// 2. Dummy skills array (or use your existing skills array from Unit 7)
const allSkills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

// 3. Helper function to render skill cards into the DOM
function displaySkills(skillsToRender) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = ''; // Clear existing cards

  if (skillsToRender.length === 0) {
    container.innerHTML = '<p>No skills found in this category.</p>';
    return;
  }

  skillsToRender.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <h3>${skill.title}</h3>
      <p>Category: ${skill.category}</p>
      <p>Price: $${skill.price}/hr</p>
    `;
    container.appendChild(card);
  });
}

// 4. Attach click listeners to filter buttons
document.addEventListener('DOMContentLoaded', () => {
  displaySkills(allSkills); // Initial render

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-category');
      const filtered = filterSkillsByCategory(allSkills, selectedCategory);
      displaySkills(filtered);
    });
  });
});

// 1. Function copied from skillswap-functions.js
function calculateTotalCost(hourlyRate, hours) {
  return hourlyRate * hours;
}

// 2. Form submission listener
document.addEventListener('DOMContentLoaded', () => {
  const calcForm = document.getElementById('cost-calculator-form');
  const resultDisplay = document.getElementById('cost-result');

  if (calcForm) {
    calcForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Convert input string values to numbers
      const rate = parseFloat(document.getElementById('hourly-rate').value) || 0;
      const hours = parseFloat(document.getElementById('session-hours').value) || 0;

      const total = calculateTotalCost(rate, hours);
      resultDisplay.textContent = `Total Estimated Cost: $${total.toFixed(2)}`;
    });
  }
});