const SUPABASE_URL = "https://xrwtuneumaoviwdintej.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_WshnYFpEH1zJRpjH9kzugA_1fV6iiGn";

const today = new Date();
const todayKey = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

document.getElementById("todayLabel").textContent = today.toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
});

async function loadDailyContent() {
  const status = document.getElementById("dataStatus");
  try {
    const endpoint =
      `${SUPABASE_URL}/rest/v1/daily_content?select=*&date=eq.${encodeURIComponent(todayKey)}&limit=1`;

    const response = await fetch(endpoint, {
      headers: {
        "apikey": SUPABASE_PUBLISHABLE_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}`);
    }

    const rows = await response.json();

    if (!rows.length) {
      status.textContent = "No content for today";
      return;
    }

    const item = rows[0];

    if (item.bible_verse) document.getElementById("bibleVerse").textContent = `“${item.bible_verse}”`;
    if (item.bible_reference) document.getElementById("bibleReference").textContent = item.bible_reference;
    if (item.motivation) document.getElementById("motivationText").textContent = item.motivation;
    if (item.hot_take) document.getElementById("hotTakeText").textContent = item.hot_take;
    if (item.fact_of_the_day) document.getElementById("factText").textContent = item.fact_of_the_day;
    if (item.question_of_the_day) document.getElementById("questionText").textContent = item.question_of_the_day;

    status.textContent = "Live from Supabase";
  } catch (error) {
    console.error(error);
    status.textContent = "Connection error";
  }
}

// Local prototype check-in streak
const streakKey = "budsniche-checkin-streak";
const lastCheckinKey = "budsniche-last-checkin";
let streak = Number(localStorage.getItem(streakKey) || 0);
const lastCheckin = localStorage.getItem(lastCheckinKey);

if (lastCheckin !== todayKey) {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = [
    yesterday.getFullYear(),
    String(yesterday.getMonth() + 1).padStart(2, "0"),
    String(yesterday.getDate()).padStart(2, "0")
  ].join("-");

  streak = lastCheckin === yesterdayKey ? streak + 1 : 1;
  localStorage.setItem(streakKey, String(streak));
  localStorage.setItem(lastCheckinKey, todayKey);
}
document.getElementById("checkinStreak").textContent = streak || 1;

// Prototype poll (still local only)
const pollActions = document.getElementById("pollActions");
const pollResults = document.getElementById("pollResults");
const pollKey = `budsniche-poll-vote-${todayKey}`;
const base = { agree: 68, disagree: 32 };

function showPoll(vote) {
  let agree = base.agree;
  let disagree = base.disagree;
  if (vote === "agree") agree += 1;
  if (vote === "disagree") disagree += 1;

  const total = agree + disagree;
  const agreePct = Math.round((agree / total) * 100);
  const disagreePct = 100 - agreePct;

  document.getElementById("agreePercent").textContent = `${agreePct}%`;
  document.getElementById("disagreePercent").textContent = `${disagreePct}%`;
  document.getElementById("agreeBar").style.width = `${agreePct}%`;
  document.getElementById("disagreeBar").style.width = `${disagreePct}%`;
  document.getElementById("pollMeta").textContent = vote
    ? `You voted ${vote === "agree" ? "Agree" : "Disagree"}. Shared voting comes next.`
    : "Prototype totals shown locally.";

  pollActions.classList.add("hidden");
  pollResults.classList.remove("hidden");
}

const savedVote = localStorage.getItem(pollKey);
if (savedVote) showPoll(savedVote);

document.querySelectorAll(".vote-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const vote = btn.dataset.vote;
    localStorage.setItem(pollKey, vote);
    showPoll(vote);
  });
});

// Prototype game
const rounds = [
  {
    category: "World / Food",
    topic: "Chick-fil-A",
    missed: "Dwarf Grill — 100",
    concepts: [
      { names: ["dwarf grill", "the dwarf grill"], score: 100 },
      { names: ["hapeville georgia", "hapeville", "hapeville ga"], score: 98 },
      { names: ["1946", "founded 1946"], score: 97 },
      { names: ["truett cathy", "s truett cathy"], score: 94 },
      { names: ["closed sundays", "closed sunday", "sunday closing"], score: 67 },
      { names: ["cow mascot", "cows", "eat mor chikin", "eat more chicken"], score: 52 },
      { names: ["polynesian sauce"], score: 43 },
      { names: ["waffle fries", "waffle fry"], score: 35 },
      { names: ["chicken sandwich", "chicken sandwiches"], score: 30 },
      { names: ["fast food"], score: 12 },
      { names: ["restaurant", "resturant", "restaraunt"], score: 4 }
    ]
  },
  {
    category: "Nature / Science",
    topic: "Orca Whale",
    missed: "Orcinus orca — 100",
    concepts: [
      { names: ["orcinus orca"], score: 100 },
      { names: ["delphinidae"], score: 94 },
      { names: ["spyhopping", "spy hopping"], score: 90 },
      { names: ["echolocation", "echo location"], score: 76 },
      { names: ["pod", "pods"], score: 72 },
      { names: ["apex predator"], score: 68 },
      { names: ["dolphin", "dolphin family"], score: 58 },
      { names: ["salmon"], score: 52 },
      { names: ["marine mammal"], score: 44 },
      { names: ["black and white", "black white"], score: 30 },
      { names: ["killer whale"], score: 24 },
      { names: ["ocean"], score: 15 },
      { names: ["water"], score: 8 },
      { names: ["animal"], score: 3 }
    ]
  },
  {
    category: "History",
    topic: "Battle of Gettysburg",
    missed: "Pickett's Charge — 100",
    concepts: [
      { names: ["picketts charge", "pickett's charge"], score: 100 },
      { names: ["george meade", "meade"], score: 96 },
      { names: ["robert e lee", "robert lee", "general lee"], score: 94 },
      { names: ["july 1863", "1863"], score: 90 },
      { names: ["gettysburg pennsylvania", "pennsylvania"], score: 74 },
      { names: ["union"], score: 62 },
      { names: ["confederacy", "confederate"], score: 62 },
      { names: ["civil war", "american civil war"], score: 46 },
      { names: ["abraham lincoln", "lincoln"], score: 42 },
      { names: ["slavery"], score: 32 },
      { names: ["battlefield"], score: 18 },
      { names: ["war"], score: 8 }
    ]
  }
];

let roundIndex = 0;
let timerId = null;
let secondsLeft = 45;
let totalScore = 0;
let roundLocked = false;

const categoryLabel = document.getElementById("categoryLabel");
const topicLabel = document.getElementById("topicLabel");
const timer = document.getElementById("timer");
const answerForm = document.getElementById("answerForm");
const roundResults = document.getElementById("roundResults");
const nextRound = document.getElementById("nextRound");
const startRound = document.getElementById("startRound");
const totalScoreEl = document.getElementById("totalScore");

function normalize(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ");
}

function currentInputs() {
  return [...answerForm.querySelectorAll("input")];
}

function renderRound() {
  const round = rounds[roundIndex];
  categoryLabel.textContent = round.category;
  topicLabel.textContent = round.topic;
  secondsLeft = 45;
  timer.textContent = secondsLeft;
  roundLocked = false;
  roundResults.classList.add("hidden");
  roundResults.innerHTML = "";
  nextRound.classList.add("hidden");
  currentInputs().forEach((input) => {
    input.value = "";
    input.disabled = false;
  });
  document.getElementById("submitAnswers").disabled = false;
}

function startTimer() {
  clearInterval(timerId);
  if (roundLocked) renderRound();
  secondsLeft = 45;
  timer.textContent = secondsLeft;

  timerId = setInterval(() => {
    secondsLeft -= 1;
    timer.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timerId);
      scoreRound();
    }
  }, 1000);
}

function scoreOne(answer, round) {
  const clean = normalize(answer);
  if (!clean) return { label: "(blank)", score: 0, concept: null };

  for (const concept of round.concepts) {
    for (const alias of concept.names) {
      if (normalize(alias) === clean) {
        return { label: answer.trim(), score: concept.score, concept: concept.names[0] };
      }
    }
  }
  return { label: answer.trim(), score: 0, concept: null };
}

function scoreRound() {
  if (roundLocked) return;
  roundLocked = true;
  clearInterval(timerId);

  const round = rounds[roundIndex];
  const usedConcepts = new Set();
  const results = currentInputs().map((input) => scoreOne(input.value, round));

  let roundScore = 0;
  results.forEach((result) => {
    if (result.concept && usedConcepts.has(result.concept)) {
      result.duplicate = true;
      result.score = 0;
    }
    if (result.concept) usedConcepts.add(result.concept);
    roundScore += result.score;
  });

  totalScore += roundScore;
  totalScoreEl.textContent = totalScore;

  currentInputs().forEach((input) => input.disabled = true);
  document.getElementById("submitAnswers").disabled = true;

  roundResults.innerHTML = `
    <div class="result-list">
      ${results.map((r) => `
        <div class="result-item">
          <span>${escapeHtml(r.label)}${r.duplicate ? " <em>(duplicate)</em>" : ""}</span>
          <span class="result-score">${r.score}</span>
        </div>
      `).join("")}
    </div>
    <div class="missed">
      <strong>Round score: ${roundScore} / 400</strong><br/>
      <span class="muted">You missed: ${round.missed}</span>
    </div>
  `;
  roundResults.classList.remove("hidden");

  nextRound.textContent = roundIndex < rounds.length - 1 ? "Next Category" : "Finish / Restart Demo";
  nextRound.classList.remove("hidden");
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  scoreRound();
});

startRound.addEventListener("click", startTimer);

nextRound.addEventListener("click", () => {
  if (roundIndex < rounds.length - 1) {
    roundIndex += 1;
  } else {
    roundIndex = 0;
    totalScore = 0;
    totalScoreEl.textContent = "0";
  }
  renderRound();
  startTimer();
});

renderRound();
loadDailyContent();
