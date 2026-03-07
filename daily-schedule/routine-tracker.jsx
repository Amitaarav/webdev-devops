import { useState, useEffect } from "react";

const SCHEDULE = [
  { id: "dsa", time: "10:00 AM – 12:00 PM", label: "DSA Practice", icon: "⚡", color: "#00FF87", weekendOnly: false },
  { id: "interview", time: "1:00 PM – 5:00 PM", label: "Interview Prep / Revision", icon: "🧠", color: "#60EFFF", weekendOnly: false },
  { id: "startup", time: "5:00 PM – 7:00 PM", label: "Startup & Project", icon: "🚀", color: "#FF9F43", weekendOnly: false },
  { id: "gym", time: "8:00 PM – 9:30 PM", label: "GYM", icon: "💪", color: "#FF6B9D", weekendOnly: false },
  { id: "bootcamp", time: "10:00 PM – 4:00 AM", label: "100x Bootcamp", icon: "🔥", color: "#A855F7", weekendOnly: false },
  { id: "sysdesign", time: "Weekend: 3hrs", label: "System Design Deep Dive", icon: "🏗️", color: "#FCD34D", weekendOnly: true },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekKey() {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  return startOfWeek.toISOString().split("T")[0];
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getTodayDayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1; // Mon=0 ... Sun=6
}

export default function App() {
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("routine_progress") || "{}");
    } catch { return {}; }
  });
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("routine_notes") || "{}");
    } catch { return {}; }
  });
  const [activeDay, setActiveDay] = useState(getTodayDayIndex());
  const [noteInput, setNoteInput] = useState("");
  const [view, setView] = useState("today"); // "today" | "week"

  const weekKey = getWeekKey();
  const todayKey = getTodayKey();
  const todayDayIndex = getTodayDayIndex();
  const isWeekend = activeDay >= 5;

  const getDayKey = (dayIdx) => {
    const now = new Date();
    const diff = dayIdx - (now.getDay() === 0 ? 6 : now.getDay() - 1);
    const d = new Date(now);
    d.setDate(now.getDate() + diff);
    return d.toISOString().split("T")[0];
  };

  const toggleTask = (taskId) => {
    const dayKey = getDayKey(activeDay);
    setProgress(prev => {
      const next = { ...prev };
      if (!next[dayKey]) next[dayKey] = {};
      next[dayKey][taskId] = !next[dayKey][taskId];
      localStorage.setItem("routine_progress", JSON.stringify(next));
      return next;
    });
  };

  const saveNote = () => {
    if (!noteInput.trim()) return;
    const dayKey = getDayKey(activeDay);
    setNotes(prev => {
      const next = { ...prev, [dayKey]: noteInput };
      localStorage.setItem("routine_notes", JSON.stringify(next));
      return next;
    });
  };

  const getDayProgress = (dayIdx) => {
    const dayKey = getDayKey(dayIdx);
    const dayIsWeekend = dayIdx >= 5;
    const tasks = SCHEDULE.filter(t => dayIsWeekend ? true : !t.weekendOnly);
    const completed = tasks.filter(t => progress[dayKey]?.[t.id]).length;
    return { completed, total: tasks.length };
  };

  const activeDayKey = getDayKey(activeDay);
  const activeTasks = SCHEDULE.filter(t => isWeekend ? true : !t.weekendOnly);
  const dayProgress = activeTasks.filter(t => progress[activeDayKey]?.[t.id]).length;
  const dayTotal = activeTasks.length;
  const pct = Math.round((dayProgress / dayTotal) * 100);

  // Streak calculation
  const calcStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dk = d.toISOString().split("T")[0];
      const di = d.getDay() === 0 ? 6 : d.getDay() - 1;
      const isWe = di >= 5;
      const tasks = SCHEDULE.filter(t => isWe ? true : !t.weekendOnly);
      const completed = tasks.filter(t => progress[dk]?.[t.id]).length;
      if (completed === tasks.length) streak++;
      else if (i > 0) break;
    }
    return streak;
  };
  const streak = calcStreak();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#E8E8F0",
      fontFamily: "'DM Mono', 'Fira Code', monospace",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .task-card {
          background: #13131A;
          border: 1px solid #1E1E2E;
          border-radius: 12px;
          padding: 18px 20px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 16px;
          user-select: none;
        }
        .task-card:hover { border-color: #333; transform: translateX(2px); }
        .task-card.done { background: #0D1A14; }
        .day-btn {
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid #1E1E2E;
          background: transparent;
          color: #888;
          cursor: pointer;
          font-family: inherit;
          font-size: 13px;
          transition: all 0.2s;
          position: relative;
        }
        .day-btn:hover { border-color: #444; color: #ccc; }
        .day-btn.active { background: #1E1E2E; color: #fff; border-color: #444; }
        .day-btn.today-btn::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #00FF87;
          border-radius: 50%;
        }
        .view-btn {
          padding: 8px 20px;
          border-radius: 6px;
          border: 1px solid #1E1E2E;
          background: transparent;
          color: #888;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          transition: all 0.2s;
        }
        .view-btn.active { background: #1E1E2E; color: #fff; }
        .note-input {
          width: 100%;
          background: #13131A;
          border: 1px solid #1E1E2E;
          border-radius: 8px;
          padding: 12px 14px;
          color: #E8E8F0;
          font-family: inherit;
          font-size: 13px;
          resize: none;
          outline: none;
          transition: border 0.2s;
        }
        .note-input:focus { border-color: #444; }
        .save-btn {
          padding: 8px 18px;
          background: #00FF87;
          color: #000;
          border: none;
          border-radius: 6px;
          font-family: inherit;
          font-weight: 500;
          cursor: pointer;
          font-size: 12px;
          transition: opacity 0.2s;
        }
        .save-btn:hover { opacity: 0.85; }
        .progress-ring { transform: rotate(-90deg); }
        .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
        .week-cell {
          background: #13131A;
          border: 1px solid #1E1E2E;
          border-radius: 10px;
          padding: 12px 8px;
          text-align: center;
        }
        .week-cell.today-cell { border-color: #00FF87; }
        @media (max-width: 600px) {
          .week-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      {/* Header */}
      <div style={{ padding: "32px 28px 0", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
              GRIND TRACKER
            </div>
            <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {[...Array(streak || 1)].map((_, i) => (
                <span key={i} style={{ fontSize: 14 }}>🔥</span>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#555" }}>{streak} day streak</div>
          </div>
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 6, marginTop: 20, marginBottom: 20 }}>
          <button className={`view-btn ${view === "today" ? "active" : ""}`} onClick={() => setView("today")}>Daily</button>
          <button className={`view-btn ${view === "week" ? "active" : ""}`} onClick={() => setView("week")}>Weekly</button>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 28px 60px" }}>

        {/* Day selector */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {DAYS.map((d, i) => {
            const { completed, total } = getDayProgress(i);
            return (
              <button
                key={d}
                className={`day-btn ${activeDay === i ? "active" : ""} ${i === todayDayIndex ? "today-btn" : ""}`}
                onClick={() => setActiveDay(i)}
                style={{ minWidth: 52 }}
              >
                <div>{d}</div>
                <div style={{ fontSize: 10, color: completed === total ? "#00FF87" : "#555", marginTop: 2 }}>
                  {completed}/{total}
                </div>
              </button>
            );
          })}
        </div>

        {view === "today" && (
          <>
            {/* Progress ring + label */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, background: "#13131A", border: "1px solid #1E1E2E", borderRadius: 14, padding: "20px 24px" }}>
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#1E1E2E" strokeWidth="6" />
                <circle
                  className="progress-ring"
                  cx="32" cy="32" r="26"
                  fill="none"
                  stroke="#00FF87"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease", transformOrigin: "32px 32px" }}
                />
                <text x="32" y="37" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Syne, sans-serif" fontWeight="700">{pct}%</text>
              </svg>
              <div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700 }}>
                  {DAYS[activeDay]} {activeDay === todayDayIndex ? "— Today" : ""}
                </div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                  {dayProgress} of {dayTotal} blocks completed
                </div>
                {isWeekend && <div style={{ fontSize: 11, color: "#FCD34D", marginTop: 6 }}>🏗️ Weekend — System Design day!</div>}
              </div>
            </div>

            {/* Tasks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {activeTasks.map(task => {
                const done = !!progress[activeDayKey]?.[task.id];
                return (
                  <div
                    key={task.id}
                    className={`task-card ${done ? "done" : ""}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: 22, height: 22,
                      borderRadius: 6,
                      border: `2px solid ${done ? task.color : "#333"}`,
                      background: done ? task.color + "33" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s"
                    }}>
                      {done && <span style={{ fontSize: 12, color: task.color }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 18 }}>{task.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: done ? "#555" : "#E8E8F0", textDecoration: done ? "line-through" : "none", transition: "all 0.2s" }}>
                        {task.label}
                      </div>
                      <div style={{ fontSize: 11, color: task.color, marginTop: 2, opacity: 0.8 }}>{task.time}</div>
                    </div>
                    {task.weekendOnly && (
                      <span style={{ fontSize: 10, background: "#FCD34D22", color: "#FCD34D", padding: "3px 8px", borderRadius: 4 }}>WEEKEND</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Daily note */}
            <div style={{ background: "#13131A", border: "1px solid #1E1E2E", borderRadius: 12, padding: "16px" }}>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 10, letterSpacing: 1 }}>DAILY NOTE / REFLECTION</div>
              <textarea
                className="note-input"
                rows={3}
                placeholder="What did you learn today? Any blockers?"
                value={noteInput || notes[activeDayKey] || ""}
                onChange={e => setNoteInput(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                <button className="save-btn" onClick={saveNote}>Save Note</button>
              </div>
              {notes[activeDayKey] && !noteInput && (
                <div style={{ fontSize: 12, color: "#555", marginTop: 8, fontStyle: "italic" }}>
                  Saved: {notes[activeDayKey]}
                </div>
              )}
            </div>
          </>
        )}

        {view === "week" && (
          <div>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 1, marginBottom: 16 }}>WEEKLY OVERVIEW</div>
            <div className="week-grid" style={{ marginBottom: 24 }}>
              {DAYS.map((d, i) => {
                const { completed, total } = getDayProgress(i);
                const pct2 = Math.round((completed / total) * 100);
                const isToday = i === todayDayIndex;
                return (
                  <div
                    key={d}
                    className={`week-cell ${isToday ? "today-cell" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => { setActiveDay(i); setView("today"); }}
                  >
                    <div style={{ fontSize: 11, color: isToday ? "#00FF87" : "#555", marginBottom: 8 }}>{d}</div>
                    <div style={{ fontSize: 20, fontFamily: "Syne, sans-serif", fontWeight: 700, color: pct2 === 100 ? "#00FF87" : "#fff" }}>{pct2}%</div>
                    <div style={{ fontSize: 10, color: "#444", marginTop: 4 }}>{completed}/{total}</div>
                    {/* mini bar */}
                    <div style={{ height: 3, background: "#1E1E2E", borderRadius: 2, marginTop: 8 }}>
                      <div style={{ height: "100%", width: `${pct2}%`, background: pct2 === 100 ? "#00FF87" : "#444", borderRadius: 2, transition: "width 0.4s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Schedule Reference */}
            <div style={{ background: "#13131A", border: "1px solid #1E1E2E", borderRadius: 12, padding: "20px" }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 1, marginBottom: 14 }}>SCHEDULE REFERENCE</div>
              {SCHEDULE.map(t => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 3, height: 36, background: t.color, borderRadius: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13 }}>{t.icon} {t.label}</div>
                    <div style={{ fontSize: 11, color: t.color, opacity: 0.7 }}>{t.time} {t.weekendOnly ? "· Weekend only" : ""}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
