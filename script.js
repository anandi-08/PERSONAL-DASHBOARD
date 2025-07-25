window.addEventListener("DOMContentLoaded", () => {
  const correctPassword = "anandi"; // You can change it
  const pass = prompt("Enter password to access dashboard:");
  if (pass !== correctPassword) {
    document.body.innerHTML = "<h2 style='color:black;font-weight:bold;text-align:center;'>🔒 Access Denied</h2>";
  }
});
  const bgColorPicker = document.getElementById("bg-color");
  const textColorPicker = document.getElementById("text-color");
  const fontSelect = document.getElementById("font-select");
  bgColorPicker.addEventListener("input", () => {
    document.body.style.backgroundColor = bgColorPicker.value;
  });
  textColorPicker.addEventListener("input", () => {
    document.body.style.color = textColorPicker.value;
  });
  fontSelect.addEventListener("change", () => {
    document.body.style.fontFamily = fontSelect.value;
  });
 document.getElementById("theme-toggle").onclick = () => {
      document.body.classList.toggle("dark-mode");
    };
document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.querySelector(".greeting h2");
  const dateElement = document.getElementById("date");
  const now = new Date();
  const hours = now.getHours();

  let greeting = "Hello";
  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }
greetingElement.textContent = `${greeting}, ANANDI`;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const todayDate = now.toLocaleDateString("en-US", options);
  dateElement.textContent = todayDate;
});
//✅ CLOCK
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}, 1000);
// ✅ CALENDAR
document.getElementById("calendar").innerText = new Date().toDateString();
// 🌤️ WEATHER
async function fetchWeather() {
  const apiKey = "your_api_key"; // 🔁 Replace this with your real OpenWeatherMap API key
  
  const city = "Kolkata";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weather-info").innerText = "Weather load failed!";
      return;
    }

    document.getElementById("weather-info").innerText =
      `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
  } catch (error) {
    document.getElementById("weather-info").innerText = "Network error";
    console.error(error);
  }
}
fetchWeather(); 
let events = JSON.parse(localStorage.getItem("customEvents")) || [];
function addEvent() {
  const name = document.getElementById("event-name").value.trim();
  const date = document.getElementById("event-date").value;
  if (!name || !date) {
    alert("Please enter both event name and date.");
    return;
  }
  const event = { name, date };
  events.push(event);
  localStorage.setItem("customEvents", JSON.stringify(events));
  displayEvents();
  document.getElementById("event-name").value = "";
  document.getElementById("event-date").value = "";
}
//update
// ✅ search
window.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-query");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
          } else {
        alert("Please enter a search term.");
      }
    });
  } else {
    console.error("❌ Button or input not found in the DOM.");
  }
});
//news
const newsApiKey = "your_api_key"; // ← Replace with your actual API key

const newsUrl = `https://newsdata.io/api/1/news?apikey=${newsApiKey}&country=in&category=technology`;

fetch(newsUrl)
    .then((res) => res.json())
    .then((data) => {
        const newsList = document.getElementById("news-list");
        newsList.innerHTML = "";
        data.results.slice(0, 5).forEach((article) => {
            const div = document.createElement("div");
            div.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a>`;
            newsList.appendChild(div);
        });
    })
    .catch((err) => {
        document.getElementById("news-list").innerText = "⚠ Failed to load news.";
        console.error(err);
    });
    // 💬 6. Sticky Note
function saveNote() {
  const note = document.getElementById("note").value;
  localStorage.setItem("note", note);
  alert("Note saved ✅");
}
function clearNote() {
  document.getElementById("note").value = "";
  localStorage.removeItem("note");
}

// 🟢 Load note on page load
window.onload = function () {
  const savedNote = localStorage.getItem("note");
  if (savedNote) {
    document.getElementById("note").value = savedNote;
  }
  loadTodos();
  loadEvents();
  loadReminders();
};

// ✅ 7. To-Do List
let totalTasks = 0;
let completedTasks = 0;
function loadTodos() {
  const saved = JSON.parse(localStorage.getItem("todos") || "[]");
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  totalTasks = saved.length;
  completedTasks = 0;
  saved.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo;
    li.onclick = () => {
      li.remove();
      completedTasks++;
      saveTodos();
      updateTaskCount();
    };
    list.appendChild(li);
  });

  updateTaskCount();
}
document.getElementById("todo-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter" && this.value.trim()) {
    const li = document.createElement("li");
    li.textContent = this.value;
    li.onclick = () => {
      li.remove();
      completedTasks++;
      saveTodos();
      updateTaskCount();
    };
    document.getElementById("todo-list").appendChild(li);
    this.value = "";
    totalTasks++;
    saveTodos();
    updateTaskCount();
  }
});
function saveTodos() {
  const items = document.querySelectorAll("#todo-list li");
  const todos = Array.from(items).map(li => li.textContent);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function updateTaskCount() {
  document.getElementById("task-count").textContent =
    `Total: ${totalTasks}, Completed: ${completedTasks}`;
}

document.addEventListener("DOMContentLoaded", loadTodos);
// 📆 8. Custom Events
function addEvent() {
  const name = document.getElementById("event-name").value.trim();
  const date = document.getElementById("event-date").value;
  if (!name || !date) return alert("Please enter both name and date.");

  const events = JSON.parse(localStorage.getItem("customEvents") || "[]");
  const newEvent = { name, date };
  events.push(newEvent);
  localStorage.setItem("customEvents", JSON.stringify(events));

  document.getElementById("event-name").value = "";
  document.getElementById("event-date").value = "";

  loadEvents();
}

function removeEvent(index) {
  const events = JSON.parse(localStorage.getItem("customEvents") || "[]");
  events.splice(index, 1); // remove 1 item at position `index`
  localStorage.setItem("customEvents", JSON.stringify(events));
  loadEvents();
}

function loadEvents() {
  const events = JSON.parse(localStorage.getItem("customEvents") || "[]");
  const list = document.getElementById("event-list");
  list.innerHTML = ""; // clear the old list

  events.forEach((ev, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${ev.name} on ${ev.date}
      <button class="delete-btn" onclick="removeEvent(${index})">🗑️ Delete</button>
    `;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});
// ⏰ 12. Reminders
function addReminder() {
  const text = document.getElementById("reminder-text").value.trim();
  const time = document.getElementById("reminder-time").value;

  if (!text || !time) return alert("Enter reminder text and time");

  const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
  reminders.push({ text, time });
  localStorage.setItem("reminders", JSON.stringify(reminders));

  document.getElementById("reminder-text").value = "";
  document.getElementById("reminder-time").value = "";

  loadReminders(); // refresh list
}

function removeReminder(index) {
  const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
  reminders.splice(index, 1); // remove at position `index`
  localStorage.setItem("reminders", JSON.stringify(reminders));
  loadReminders();
}

function loadReminders() {
  const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
  const list = document.getElementById("reminder-list");
  list.innerHTML = ""; // clear old items

  reminders.forEach((rem, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${rem.text} at ${new Date(rem.time).toLocaleString()}
      <button class="delete-btn" onclick="removeReminder(${index})">🗑️ Delete</button>
    `;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadReminders();
});
let currentDate = new Date();

function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = document.getElementById("calendar-days");
  const monthYear = document.getElementById("calendar-month-year");

  calendarDays.innerHTML = "";
  monthYear.textContent = `${date.toLocaleString("default", { month: "long" })} ${year}`;
  for (let i = 0; i < firstDay; i++) {
    const pad = document.createElement("div");
    calendarDays.appendChild(pad);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;

    // Highlight today's date
    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    dayCell.onclick = () => alert(`You clicked on ${day}/${month + 1}/${year}`);
    calendarDays.appendChild(dayCell);
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  generateCalendar(currentDate);
}

document.addEventListener("DOMContentLoaded", () => generateCalendar(currentDate));
// calculator
let display = document.getElementById("display");

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    alert("Invalid expression");
    clearDisplay();
  }
}
//youtube

const apiKey = "your_api_key"; // ← Replace this

async function searchYouTube() {
  const query = document.getElementById("searchInput").value;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=5&type=video`
  );
  const data = await response.json();

  const results = document.getElementById("results");
  results.innerHTML = ""; // Clear previous

  data.items.forEach(item => {
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.medium.url;

    const videoDiv = document.createElement("div");
    videoDiv.className = "video";

    videoDiv.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
        <img src="${thumbnail}" alt="${title}" />
        <h3>${title}</h3>
      </a>
    `;
    results.appendChild(videoDiv);
  });
}
// 🔊 10. Music Controls
function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
// 🎮 Tic Tac Toe Game
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    let currentPlayer = 'X';
    let cells = [];

    function openTicTacToe() {
      document.getElementById('tictactoe-popup').style.display = 'block';
      resetBoard();
    }

    function closeTicTacToe() {
      document.getElementById('tictactoe-popup').style.display = 'none';
    }

    function resetBoard() {
      board.innerHTML = '';
      result.textContent = '';
      cells = [];
      currentPlayer = 'X';
      for (let i = 0; i < 3; i++) {
        const row = board.insertRow();
        for (let j = 0; j < 3; j++) {
          const cell = row.insertCell();
          cell.textContent = '';
          cell.style.width = "50px";
          cell.style.height = "50px";
          cell.style.border = "1px solid black";
          cell.style.textAlign = "center";
          cell.style.fontSize = "24px";
          cell.style.cursor = "pointer";
          cell.onclick = () => makeMove(cell);
          cells.push(cell);
        }
      }
    }

    function makeMove(cell) {
      if (cell.textContent || result.textContent) return;
      cell.textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
        result.textContent = `${currentPlayer} wins!`;
      } else if (cells.every(c => c.textContent)) {
        result.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    function checkWin(player) {
      const values = cells.map(c => c.textContent);
      const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      return winCombos.some(combo =>
        combo.every(index => values[index] === player)
      );
    }
    // ⏳ 9. Focus Timer
let timer;
let timeLeft = 1800; // 30 min
function updateTimerDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  document.getElementById("timer-display").textContent =
    `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        alert("⏰ Time's up!");
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 1500;
  updateTimerDisplay();
  timer = null;
}
updateTimerDisplay();

// 🧘‍♀️ Breathing Timer
// 🧘‍♀️ Breathing Timer (start/stop)
const breatheText = document.getElementById('breathe-text');
const breatheCircle = document.getElementById('breathe-circle');
let breatheInterval = null;
let breathingActive = false;

document.getElementById('start-breathing').onclick = () => {
  if (breathingActive) return; // prevent multiple intervals
  breathingActive = true;
  let phase = 0;
  breatheText.textContent = "Breathe In";
  breatheCircle.style.transform = "scale(1.5)";
  breatheInterval = setInterval(() => {
    phase = (phase + 1) % 3;
    if (phase === 0) {
      breatheText.textContent = "Breathe In";
      breatheCircle.style.transform = "scale(1.5)";
    } else if (phase === 1) {
      breatheText.textContent = "Hold...";
      breatheCircle.style.transform = "scale(1.5)";
    } else {
      breatheText.textContent = "Breathe Out";
      breatheCircle.style.transform = "scale(1)";
    }
  }, 3000);
};

document.getElementById('stop-breathing').onclick = () => {
  clearInterval(breatheInterval);
  breathingActive = false;
  breatheText.textContent = "Breathing stopped.";
  breatheCircle.style.transform = "scale(1)";
};
 // 🎁 Surprise of the Day
    const tips = [
      "Drink water!",
      "Take a short walk.",
      "Stretch your arms.",
      "Smile at someone.",
      "Close your eyes for 10 seconds."
    ];

    function setSurprise() {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      document.getElementById('daily-surprise').textContent = randomTip;
    }

    window.addEventListener('load', setSurprise);
    document.getElementById('refresh-surprise').onclick = setSurprise;
    //moods

  const moodButtons = document.querySelectorAll('.mood');
  const moodText = document.getElementById('selected-mood');

  // Load saved mood
  const savedMood = localStorage.getItem('userMood');
  if (savedMood) {
    document.querySelector(`.mood[data-mood="${savedMood}"]`)?.classList.add('selected');
    moodText.textContent = `You feel: ${savedMood} ${getEmoji(savedMood)}`;
  }

  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Clear previous selection
      moodButtons.forEach(b => b.classList.remove('selected'));

      // Add new selection
      btn.classList.add('selected');
      const mood = btn.dataset.mood;
      moodText.textContent = `You feel: ${mood} ${getEmoji(mood)}`;

      // Save to localStorage
      localStorage.setItem('userMood', mood);
    });
  });

  function getEmoji(mood) {
    const emojis = {
      happy: '😊',
      sad: '😢',
      angry: '😡',
      sleepy: '😴',
      excited: '🤩'
    };
    return emojis[mood] || '';
  }
//quote

  async function getQuote() {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    quoteText.textContent = "Loading...";
    quoteAuthor.textContent = "";

    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();

      quoteText.textContent = `"${data.content}"`;
      quoteAuthor.textContent = `– ${data.author}`;
    } catch (error) {
      quoteText.textContent = "Failed to load quote.";
      quoteAuthor.textContent = "";
    }
  }
  // Load initial quote
  getQuote();
  // Add event listener to button
  document.getElementById("new-quote").addEventListener("click", getQuote);
