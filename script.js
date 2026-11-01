function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

function calculateTotalCost(hourlyRate, hours) {
  return hourlyRate * hours;
}

// Skills now come from the backend
let allSkills = [];

function displaySkills(skills) {
  const container = document.getElementById('skills-container');

  container.innerHTML = '';

  skills.forEach(skill => {
    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `
      <span class="category-badge">${skill.category}</span>
      <h3>${skill.title}</h3>
      <p class="description">${skill.description}</p>
      <p>Price: $${skill.price}/hr</p>
    `;

    container.appendChild(card);
  });
}

async function loadSkills() {
  try {
    allSkills = await window.apiService.fetchSkills();
    displaySkills(allSkills);
  } catch (error) {
    console.error('Failed to load skills:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // Load skills from database
  loadSkills();

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      const filtered =
        filterSkillsByCategory(allSkills, category);

      displaySkills(filtered);
    });
  });

  // Calculator
  const calcForm =
    document.getElementById('cost-calculator-form');

  calcForm.addEventListener('submit', event => {
    event.preventDefault();

    const rate =
      parseFloat(document.getElementById('hourly-rate').value);

    const hours =
      parseFloat(document.getElementById('session-hours').value);

    const total =
      calculateTotalCost(rate, hours);

    document.getElementById('cost-result').textContent =
      `Total Estimated Cost: $${total.toFixed(2)}`;
  });

  // Add skill form
  const skillForm =
    document.getElementById('skill-form');

  skillForm.addEventListener('submit', async event => {
    event.preventDefault();

    const skillData = {
      title: document.getElementById('skill-title').value,
      category: document.getElementById('skill-category').value,
      price: parseFloat(document.getElementById('skill-price').value),
      description: document.getElementById('skill-description').value
    };

    try {
      await window.apiService.createSkill(skillData);

      skillForm.reset();

      await loadSkills();

    } catch (error) {
      console.error('Failed to create skill:', error);
    }
  });

});