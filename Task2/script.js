// DARK MODE TOGGLE
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    toggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    toggleBtn.textContent = '🌙';
  }
});

// FAN POLL LOGIC WITH LOCALSTORAGE
const votes = JSON.parse(localStorage.getItem('cskFanVotes')) || {
  'MS Dhoni': 0,
  'Ruturaj Gaikwad': 0,
  'Deepak Chahar': 0,
  'Ravindra Jadeja': 0
};

function updatePollUI() {
  const pollResult = document.getElementById('poll-result');
  const pollBreakdown = document.getElementById('poll-breakdown');
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  pollResult.textContent = `Total Votes: ${totalVotes}`;
  pollBreakdown.innerHTML = '';

  for (const player in votes) {
    const li = document.createElement('li');
    const percent = totalVotes ? ((votes[player] / totalVotes) * 100).toFixed(1) : 0;
    li.textContent = `${player}: ${votes[player]} votes (${percent}%)`;
    pollBreakdown.appendChild(li);
  }
}

function vote(player) {
  votes[player]++;
  localStorage.setItem('cskFanVotes', JSON.stringify(votes));
  updatePollUI();
}

window.vote = vote; // expose globally for inline onclick

// INIT POLL UI
updatePollUI();

// CONTACT FORM HANDLING
const form = document.getElementById('contact-form');
const messagesDiv = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();

  if (!name || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const storedMessages = JSON.parse(localStorage.getItem('fanMessages')) || [];
  storedMessages.push({ name, message, date: new Date().toLocaleString() });
  localStorage.setItem('fanMessages', JSON.stringify(storedMessages));

  displayMessages();
  form.reset();
});

function displayMessages() {
  const storedMessages = JSON.parse(localStorage.getItem('fanMessages')) || [];
  messagesDiv.innerHTML = storedMessages.map(msg =>
    `<div class="message">
      <strong>${msg.name}</strong> <em>(${msg.date})</em>
      <p>${msg.message}</p>
    </div>`
  ).join('');
}

// Display saved messages on load
displayMessages();

// SMOOTH SCROLL FOR NAVIGATION LINKS
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// MOCK LIVE SCORES FETCHING
const liveSection = document.getElementById('live');

function fetchLiveScores() {
  // Mock live data (replace with real API fetch in future)
  const liveData = {
    isLive: true,
    match: "CSK vs RCB",
    score: "175/4",
    overs: "19.2",
    status: "CSK needs 20 runs from 4 balls"
  };

  liveSection.innerHTML = `
    <h3>${liveData.match}</h3>
    <p>Score: ${liveData.score}</p>
    <p>Overs: ${liveData.overs}</p>
    <p>Status: ${liveData.status}</p>
  `;
}

// Load mock live scores on page load
fetchLiveScores();
