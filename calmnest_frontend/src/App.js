import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function CalmNestApp() {
  // Sensory preference state
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('large');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [showSettings, setShowSettings] = useState(false);

  // Navigation tabs
  const tabs = [
    { key: 'home', label: 'Home', icon: '🏠', aria: 'Home dashboard' },
    { key: 'tasks', label: 'Tasks', icon: '🧩', aria: 'Tasks Breakdown' },
    { key: 'routine', label: 'Routine', icon: '⏰', aria: 'Routine Builder' },
    { key: 'emotion', label: 'Mood', icon: '😊', aria: 'Emotion Regulation' },
    { key: 'journal', label: 'Journal', icon: '📝', aria: 'Journal' }
  ];

  // Reactive navigation
  const [activeTab, setActiveTab] = useState('home');

  // Applied fontFamily for accessibility
  const fontFamilies = {
    'sans-serif': 'Inter, Roboto, Helvetica, Arial, sans-serif',
    'dyslexie': 'Dyslexie, Arial, sans-serif' // User needs Dyslexie font installed or loaded for effect
  };

  // PUBLIC_INTERFACE
  function handleThemeToggle() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  // PUBLIC_INTERFACE
  function handleFontSizeChange(event) {
    setFontSize(event.target.value);
  }

  // PUBLIC_INTERFACE
  function handleFontFamilyChange(event) {
    setFontFamily(event.target.value);
  }

  // PUBLIC_INTERFACE
  function handleNav(tab) {
    setActiveTab(tab);
  }

  // PUBLIC_INTERFACE
  function toggleSettings() {
    setShowSettings(prev => !prev);
  }

  // PUBLIC_INTERFACE
  function QuickExit() {
    // Simple implementation: instantly replaces app with a "Calm Mode" overlay
    return (
      <div
        style={{
          position: 'fixed', left: 0, top: 0, width: '100vw',
          height: '100vh', background: '#B3E5FC', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
        }}
        role="alertdialog"
        aria-modal="true"
      >
        <h1 style={{ color: '#1a237e', fontSize: '2rem' }}>Calm Mode</h1>
        <p style={{ color: '#37474f', fontSize: '1.1rem', margin: 24 }}>
          Take a deep breath. You are safe. <br /><br />
          <button
            style={{
              background: '#A5D6A7',
              border: 'none',
              fontSize: '1.2rem',
              padding: '20px 48px',
              borderRadius: 16,
              marginTop: 32
            }}
            onClick={() => window.location.reload()}
            aria-label="Exit Calm Mode and return to main app"
          >Return</button>
        </p>
      </div>
    )
  }

  // Accessibility/appearance CSS vars
  const rootVars = {
    '--primary': '#B3E5FC',
    '--secondary': '#FFF9C4',
    '--accent': '#A5D6A7',
    '--navbar': '#e3f0f7',
    '--surface': theme === 'light' ? '#F7FAFE' : '#263238',
    '--on-primary': '#0B2136',
    '--on-secondary': '#37474F',
    '--on-accent': '#08583C',
    '--text-main': theme === 'light' ? '#19202b' : '#ffffff',
    '--border': '#eee',
    '--font-size': fontSize === 'large' ? '1.17rem' : '1rem',
    '--font-family': fontFamilies[fontFamily]
  };

  // For demo, CalmMode overlay isn't triggered unless "Quick Exit" used
  const [showCalm, setShowCalm] = useState(false);

  return (
    <div
      className="calmnest-root"
      aria-label="CalmNest Main App Container"
      style={{
        minHeight: '100vh',
        background: 'var(--surface)',
        color: 'var(--text-main)',
        fontFamily: `var(--font-family)`,
        fontSize: `var(--font-size)`,
        transition: 'background 0.3s, color 0.3s, font-size 0.3s',
        ...rootVars
      }}
    >
      <header className="calmnest-navbar" style={{
        background: 'var(--primary)',
        color: 'var(--on-primary)',
        padding: 0,
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '2px solid var(--border)',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontWeight: 800, fontSize: 32, letterSpacing: 2, marginLeft: 18,
            color: '#4dd0e1'
          }}>🕊️</span>
          <span style={{ fontWeight: 700, fontSize: 24 }}>CalmNest</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            aria-label="Sensory Preferences"
            style={{
              background: 'var(--accent)',
              border: 'none',
              fontSize: 20,
              color: 'var(--on-accent)',
              padding: '7px 14px',
              marginRight: 10,
              borderRadius: 8,
              cursor: 'pointer'
            }}
            onClick={toggleSettings}
            tabIndex={0}
          >⚙️</button>
          <button
            aria-label="Quick Exit / Calm Mode"
            style={{
              background: 'var(--secondary)',
              color: 'var(--on-secondary)',
              border: 'none',
              fontWeight: 600,
              padding: '7px 14px',
              borderRadius: 8,
              fontSize: 18,
              cursor: 'pointer',
              marginRight: 14
            }}
            onClick={() => setShowCalm(true)}
            tabIndex={0}
          >Calm Mode</button>
        </div>
      </header>

      {showCalm && <QuickExit />}

      {showSettings && (
        <section
          aria-label="Sensory Preferences Settings"
          style={{
            position: 'fixed',
            top: 75,
            right: 20,
            background: '#fff',
            zIndex: 990,
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            minWidth: 260,
            color: '#222'
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 14, fontWeight: 700 }}>Sensory Preferences</h3>
          <div style={{ marginBottom: 12 }}>
            <label>
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
                style={{ marginRight: 8 }}
              />
              Dark mode
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>
              Font size:&nbsp;
              <select value={fontSize} onChange={handleFontSizeChange} aria-label="Choose font size">
                <option value="large">Large</option>
                <option value="normal">Normal</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>
              Font style:&nbsp;
              <select value={fontFamily} onChange={handleFontFamilyChange} aria-label="Choose font style">
                <option value="sans-serif">Sans Serif</option>
                <option value="dyslexie">Dyslexie</option>
              </select>
            </label>
          </div>
          <div style={{ color: 'var(--on-secondary)', fontSize: 13, marginTop: 20 }}>
            Haptic and sound effects are enabled if supported by your device.
          </div>
          <button
            style={{
              background: 'var(--accent)',
              marginTop: 16,
              border: 'none',
              borderRadius: 7,
              padding: '7px 18px',
              fontSize: 16,
              cursor: 'pointer',
              fontWeight: 600
            }}
            onClick={toggleSettings}
            aria-label="Close Sensory Preferences"
          >Close</button>
        </section>
      )}

      <main
        id="main-content"
        className="container"
        role="main"
        aria-live="polite"
        style={{
          paddingTop: 90,
          paddingBottom: 105,
          minHeight: 520
        }}
      >
        {activeTab === 'home' && <HomeDashboard onGoto={setActiveTab} />}
        {activeTab === 'tasks' && <TasksBreakdown />}
        {activeTab === 'routine' && <RoutineBuilder />}
        {activeTab === 'emotion' && <EmotionPanel />}
        {activeTab === 'journal' && <Journal />}
      </main>

      <nav
        aria-label="Primary Navigation"
        className="calmnest-botnav"
        style={{
          background: 'var(--primary)',
          color: 'var(--on-primary)',
          boxShadow: '0 2px 24px rgba(33,80,160,0.045)',
          borderTop: '2px solid var(--border)',
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 110,
          display: 'flex',
          flexDirection: 'row',
          height: 72
        }}
      >
        {tabs.map(t => (
          <button
            key={t.key}
            aria-label={t.aria}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontSize: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeTab === t.key ? '#0288d1' : 'var(--on-primary)',
              padding: '6px 0',
              fontWeight: activeTab === t.key ? 700 : 400
            }}
            onClick={() => handleNav(t.key)}
            tabIndex={0}
          >
            <span>{t.icon}</span>
            <span style={{
              fontSize: 12,
              marginTop: 1,
              letterSpacing: 1
            }}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div >
  );
}

// ----- Feature View Components -----

/**
 * Home Dashboard: Overview of today's info and quick actions.
 */
function HomeDashboard({ onGoto }) {
  return (
    <section aria-label="Dashboard / Home page" style={{ paddingBottom: 18 }}>
      {/* Purpose statement for neurodivergent users */}
      <div
        style={{
          background: 'rgba(179, 229, 252, 0.38)',
          color: '#16475e',
          padding: '14px 20px 11px 20px',
          margin: '0 0 10px 0',
          borderRadius: 10,
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
          border: '1.5px solid #B3E5FC',
          boxShadow: '0 1px 4px rgba(33,80,160,0.04)'
        }}
        aria-label="App purpose statement"
      >
        This app helps neurodivergent users manage routines, focus on tasks, regulate emotions, journal thoughts, and reduce sensory overload.
      </div>
      <h2 style={{ fontWeight: 700, fontSize: '1.7rem', margin: '12px 0' }}>Hello, welcome to CalmNest!</h2>
      <div style={{
        display: 'flex', gap: 18, flexWrap: 'wrap', margin: '10px 0',
        flexDirection: 'row', justifyContent: 'space-between'
      }}>
        <HomeCard
          title="Today's Tasks"
          icon="🧩"
          accent="#f6c1de"
          onClick={() => onGoto('tasks')}
        />
        <HomeCard
          title="Today's Routine"
          icon="⏰"
          accent="#d2cfff"
          onClick={() => onGoto('routine')}
        />
        <HomeCard
          title="Mood & Calm"
          icon="😊"
          accent="#b5f3e0"
          onClick={() => onGoto('emotion')}
        />
        <HomeCard
          title="Journal"
          icon="📝"
          accent="#ffecb3"
          onClick={() => onGoto('journal')}
        />
      </div>
      <div
        style={{
          marginTop: 40, background: '#A5D6A7', color: '#08583C',
          borderRadius: 12, padding: '23px 18px'
        }}
        tabIndex={0}
      >
        <b>Summary:</b> <br />
        Your mood: <span aria-label="Current mood emoji" title="Current mood">😊</span> <br />
        Steps complete: <b>4/7</b> | Pomodoro focus: <b>2/4</b> blocks done <br />
      </div>
    </section>
  )
}

// Home quick nav card
function HomeCard({ title, icon, accent, onClick }) {
  return (
    <button
      style={{
        flex: 1, minWidth: 120, minHeight: 100, margin: '10px 5px',
        background: accent, border: 'none', borderRadius: 14,
        fontSize: 19, fontWeight: 500, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', boxShadow: '0 2px 12px rgba(135,135,135,0.08)',
        gap: 5, outline: 'none', letterSpacing: 1
      }}
      aria-label={`Go to ${title}`}
      onClick={onClick}
      tabIndex={0}
    >
      <span style={{ fontSize: 38, marginBottom: 4 }}>{icon}</span>
      {title}
    </button>
  );
}

/**
 * Visual Task Breakdown (color-coded steps, checkbox, icon, voice input support stub)
 */
function TasksBreakdown() {
  // State for list of tasks (each with steps)
  const [tasks, setTasks] = useState([
    {
      title: "Clean desk",
      steps: [
        { text: "Clear cups 🍶", color: "#B3E5FC" },
        { text: "Put away papers 📄", color: "#A5D6A7" },
        { text: "Wipe surface 🧻", color: "#FFF9C4" }
      ]
    }
  ]);
  // Input state: which task idx & step idx (or null) is being edited
  const [editingTaskIdx, setEditingTaskIdx] = useState(null); // {number|null}
  const [editingStep, setEditingStep] = useState({ taskIdx: null, stepIdx: null }); // {taskIdx, stepIdx}
  const [taskDraft, setTaskDraft] = useState(""); // string for editing task title
  const [stepDraft, setStepDraft] = useState(""); // string for editing step text

  // PUBLIC_INTERFACE
  // Handle adding a new task (focus input for name immediately)
  function handleAddTask() {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        title: "",
        steps: [{ text: "", color: "#B3E5FC" }]
      }
    ]);
    setTimeout(() => {
      setEditingTaskIdx(tasks.length);
      setTaskDraft(""); // explicit
      setEditingStep({ taskIdx: tasks.length, stepIdx: 0 });
      setStepDraft("");
    }, 0);
  }

  // PUBLIC_INTERFACE
  // Save a task title after edit/creation
  function saveTaskTitle(idx, draft) {
    setTasks(prevTasks =>
      prevTasks.map((t, i) =>
        i === idx ? { ...t, title: draft.trim() || "Untitled Task" } : t
      )
    );
    setEditingTaskIdx(null);
    setTaskDraft("");
  }

  // PUBLIC_INTERFACE
  // Make any existing task editable (rename functionality)
  function handleRenameTask(idx, currTitle) {
    setEditingTaskIdx(idx);
    setTaskDraft(currTitle);
  }

  // PUBLIC_INTERFACE
  // Handle adding a new block/step to the task at given idx and focus input
  function handleAddBlock(taskIdx) {
    const blockColors = ["#B3E5FC", "#A5D6A7", "#FFF9C4"];
    setTasks(prevTasks => {
      // Calculate the new steps array for the specific task index
      return prevTasks.map((t, idx) => {
        if (idx !== taskIdx) return t;
        const nextColor = blockColors[t.steps.length % blockColors.length];
        return {
          ...t,
          steps: [
            ...t.steps,
            { text: "", color: nextColor }
          ]
        };
      });
    });
    // Set edit mode for the new block in the same update cycle, referencing steps length + 1
    setEditingStep({
      taskIdx,
      stepIdx: tasks[taskIdx].steps.length // the new index is the current length (after push will be last)
    });
    setStepDraft("");
  }

  // PUBLIC_INTERFACE
  // Save name for a step/block after input
  function saveStepName(taskIdx, stepIdx, text) {
    setTasks(prevTasks =>
      prevTasks.map((t, i) => {
        if (i !== taskIdx) return t;
        return {
          ...t,
          steps: t.steps.map((s, j) =>
            j === stepIdx ? { ...s, text: text.trim() || "Untitled Step" } : s
          )
        };
      })
    );
    setEditingStep({ taskIdx: null, stepIdx: null });
    setStepDraft("");
  }

  // PUBLIC_INTERFACE
  // Allow renaming any step/block in-place
  function handleRenameStep(taskIdx, stepIdx, currText) {
    setEditingStep({ taskIdx, stepIdx });
    setStepDraft(currText);
  }

  // Keyboard handler for Enter to save (task or step)
  function handleTaskKeyDown(e, idx) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveTaskTitle(idx, taskDraft);
    } else if (e.key === "Escape") {
      setEditingTaskIdx(null);
      setTaskDraft("");
    }
  }
  function handleStepKeyDown(e, taskIdx, stepIdx) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveStepName(taskIdx, stepIdx, stepDraft);
    } else if (e.key === "Escape") {
      setEditingStep({ taskIdx: null, stepIdx: null });
      setStepDraft("");
    }
  }

  // UI reflecting current state
  return (
    <section aria-label="Visual Task Breakdown">
      <h2 style={{ fontWeight: 700, fontSize: 23, margin: '18px 0 10px' }}>
        Tasks & Steps
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tasks.map((task, idx) => (
          <div key={idx} style={{
            background: "#fff",
            borderRadius: 12, boxShadow: '0 3px 18px rgba(80,120,180,0.04)',
            padding: 18, color: "#222"
          }}>
            <div style={{ fontWeight: 600, marginBottom: 9, fontSize: 17, display: "flex", alignItems: "center" }}>
              {editingTaskIdx === idx ? (
                <input
                  autoFocus
                  type="text"
                  value={taskDraft}
                  onChange={e => setTaskDraft(e.target.value)}
                  onBlur={() => saveTaskTitle(idx, taskDraft)}
                  onKeyDown={e => handleTaskKeyDown(e, idx)}
                  style={{ fontSize: 17, fontWeight: 600, borderRadius: 7, border: "2px solid #B3E5FC", padding: "3px 10px", minWidth: 90 }}
                  aria-label="Task name"
                />
              ) : (
                <span
                  onClick={() => handleRenameTask(idx, task.title)}
                  tabIndex={0}
                  style={{ cursor: "pointer", outline: "none", borderBottom: "1px dashed #A5D6A7" }}
                  aria-label={`Rename task: ${task.title}`}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRenameTask(idx, task.title);
                    }
                  }}
                >{task.title || "(Click to name task)"}</span>
              )}
              <button
                onClick={() => handleAddBlock(idx)}
                style={{
                  marginLeft: 18,
                  fontSize: 17,
                  background: "var(--primary)",
                  color: "#16475e",
                  border: "none",
                  borderRadius: 7,
                  padding: '4px 14px',
                  cursor: "pointer",
                  fontWeight: 500
                }}
                aria-label={`Add block to ${task.title || "this task"}`}
              >+ Add Block</button>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {task.steps.map((s, i) => (
                <li key={i} style={{
                  background: s.color,
                  borderRadius: 7, marginBottom: 7, display: 'flex', alignItems: 'center',
                  gap: 11, padding: '6px 13px'
                }}>
                  <input
                    type="checkbox"
                    tabIndex={0}
                    aria-label={`Mark step "${s.text}" complete`}
                    style={{ width: 22, height: 22 }}
                  />
                  {editingStep.taskIdx === idx && editingStep.stepIdx === i ? (
                    <input
                      ref={el => {
                        // Only focus if this is the active "editingStep"
                        if (
                          el &&
                          editingStep.taskIdx === idx &&
                          editingStep.stepIdx === i
                        ) {
                          el.focus();
                        }
                      }}
                      type="text"
                      value={stepDraft}
                      onChange={e => setStepDraft(e.target.value)}
                      onBlur={() => saveStepName(idx, i, stepDraft)}
                      onKeyDown={e => handleStepKeyDown(e, idx, i)}
                      style={{ fontSize: 16, fontWeight: 500, borderRadius: 6, border: "2px solid #A5D6A7", padding: "3px 8px", minWidth: 65 }}
                      aria-label="Block/step name"
                    />
                  ) : (
                    <span
                      onClick={() => handleRenameStep(idx, i, s.text)}
                      tabIndex={0}
                      style={{ fontSize: 18, cursor: "pointer", outline: "none", borderBottom: "1px dashed #B3E5FC" }}
                      aria-label={`Rename step: ${s.text || "(Click to name step)"}`}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleRenameStep(idx, i, s.text);
                        }
                      }}
                    >
                      {(s.text === "" && !(editingStep.taskIdx === idx && editingStep.stepIdx === i))
                          ? null // never show "(Click to name step)" for a block in edit mode
                          : s.text}
                    </span>
                  )}
                  {/* Voice Input (stub) */}
                  <button
                    style={{
                      marginLeft: 'auto',
                      background: 'transparent',
                      border: 'none',
                      fontSize: 24,
                      color: '#0288d1',
                      cursor: 'pointer'
                    }}
                    aria-label={`Voice input for "${s.text}"`}
                    disabled
                  >🎤</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ margin: "38px 0 0 0" }}>
        <button
          style={{
            background: 'var(--primary)',
            color: '#16475e',
            border: 'none',
            borderRadius: 9,
            padding: '9px 30px',
            fontWeight: 600,
            fontSize: 19,
            cursor: 'pointer'
          }}
          onClick={handleAddTask}
          aria-label="Add a new task"
        >+ Add New Task</button>
      </div>
    </section>
  );
}

/**
 * Routine Builder, now supports immediate rename of new blocks via input.
 */
// PUBLIC_INTERFACE
function RoutineBuilder() {
  // Blocks: {icon, label}
  const [blocks, setBlocks] = useState([
    { icon: "🌅", label: "8:00am - Wake up & breakfast" },
    { icon: "📚", label: "9:00am - Study/focus block" },
    { icon: "🚶", label: "10:45am - Walk/stretch break" },
    { icon: "🍽️", label: "12:20pm - Lunch" }
  ]);
  // Edit state: which index is being edited, and the draft text
  const [editingIdx, setEditingIdx] = useState(null); // {number|null}
  const [blockDraft, setBlockDraft] = useState("");

  // PUBLIC_INTERFACE
  function handleAddBlock() {
    const icons = ["🌅", "📚", "🚶", "🍽️", "🧘", "🎶", "💻", "📖"];
    const nextIcon = icons[blocks.length % icons.length];
    // Add empty-labeled block, then set edit mode after state commit
    setBlocks([
      ...blocks,
      { icon: nextIcon, label: "" }
    ]);
    // Focus and edit renaming after render
    setTimeout(() => {
      setEditingIdx(blocks.length); // next block's index
      setBlockDraft("");
    }, 0);
  }

  // PUBLIC_INTERFACE
  function saveBlock(idx, draft) {
    setBlocks(prev =>
      prev.map((b, i) =>
        i === idx
          ? { ...b, label: draft.trim() || `Block ${idx + 1}` }
          : b
      )
    );
    setEditingIdx(null);
    setBlockDraft("");
  }

  // Allow inline rename of a block
  function handleRenameBlock(idx, label) {
    setEditingIdx(idx);
    setBlockDraft(label);
  }

  // Keyboard save/cancel when editing label
  function handleBlockKeyDown(e, idx) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveBlock(idx, blockDraft);
    } else if (e.key === "Escape") {
      setEditingIdx(null);
      setBlockDraft("");
    }
  }

  return (
    <section aria-label="Routine Builder">
      <h2 style={{ fontWeight: 700, fontSize: 23, margin: '18px 0 10px' }}>My Routine</h2>
      <div style={{
        background: "#fff",
        borderRadius: 12, boxShadow: '0 3px 18px rgba(80,120,180,0.04)',
        padding: 18, color: "#222"
      }}>
        {blocks.map((b, idx) => (
          <div key={idx} style={{ marginBottom: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 13 }}>
            <span role="img" aria-label={`block-icon-${idx}`}>{b.icon}</span>
            {/* If editing this block, render an input/autoFocus */}
            {editingIdx === idx ? (
              <input
                autoFocus
                type="text"
                value={blockDraft}
                onChange={e => setBlockDraft(e.target.value)}
                onBlur={() => saveBlock(idx, blockDraft)}
                onKeyDown={e => handleBlockKeyDown(e, idx)}
                style={{ fontSize: 16, fontWeight: 600, borderRadius: 7, border: "2px solid #B3E5FC", padding: "2px 9px", minWidth: 95 }}
                aria-label="Block name"
              />
            ) : (
              <span
                onClick={() => handleRenameBlock(idx, b.label)}
                tabIndex={0}
                style={{ cursor: "pointer", outline: "none", borderBottom: "1px dashed #A5D6A7" }}
                aria-label={`Rename block: ${b.label || "(Click to name block)"}`}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRenameBlock(idx, b.label);
                  }
                }}
              >
                {b.label || "(Click to name block)"}
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ margin: "38px 0 0 0" }}>
        <button
          style={{
            background: 'var(--primary)',
            color: '#16475e',
            border: 'none',
            borderRadius: 9,
            padding: '9px 30px',
            fontWeight: 600,
            fontSize: 19,
            cursor: 'pointer'
          }}
          onClick={handleAddBlock}
          aria-label="Add a new block"
        >+ Add Block</button>
      </div>
    </section>
  );
}

/**
 * Emotion Regulation Panel (select mood, show resources: GIF, tips, grounding)
 */
function EmotionPanel() {
  // PUBLIC_INTERFACE
  // Each mood now maps to a reputable resource (YouTube for Calm if requested).
  // These are accessible globally and do not require sign-up!
  // Robust, explicit mapping: mood label to correct public YouTube video
  const moodLinks = {
    "Calm": "https://www.youtube.com/watch?v=eKFTSSKCzWA",
    "Feeling Anxious": "https://www.youtube.com/watch?v=aNXKjGFUlMs",
    "Feeling Angry": "https://www.youtube.com/watch?v=pYnKJYIqp6A",
    "Sad Right Now": "https://www.youtube.com/watch?v=26U_seo0a1g"
  };

  const moodResources = [
    {
      emoji: '😌',
      label: 'Calm',
      url: moodLinks["Calm"],
      altText: "Opens calming nature sounds and birds video on YouTube"
    },
    {
      emoji: '😰',
      label: 'Feeling Anxious',
      url: moodLinks["Feeling Anxious"],
      altText: "Watch a guided breathing exercise video for anxiety on YouTube"
    },
    {
      emoji: '😠',
      label: 'Feeling Angry',
      url: moodLinks["Feeling Angry"],
      altText: "Play soothing white noise for anger regulation (YouTube)"
    },
    {
      emoji: '😢',
      label: 'Sad Right Now',
      url: moodLinks["Sad Right Now"],
      altText: "Watch a motivational encouragement video for sadness (YouTube)"
    }
  ];

  const [selected, setSelected] = useState('');

  // PUBLIC_INTERFACE
  function openInNewTabSafe(url) {
    // Always open in a new tab (reliable, works with pop-up blockers, uses <a>)
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    // Must be in document for Firefox
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // PUBLIC_INTERFACE
  function handleMoodClick(evt, m) {
    evt.preventDefault();
    setSelected(m.label);
    openInNewTabSafe(m.url);
  }

  // PUBLIC_INTERFACE
  function handleMoodKeyDown(evt, m) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      setSelected(m.label);
      openInNewTabSafe(m.url);
    }
  }

  return (
    <section aria-label="Emotion Regulation Panel">
      <h2 style={{
        fontWeight: 700, fontSize: 23, margin: '18px 0 10px', textAlign: 'center'
      }}>
        How are you feeling?
      </h2>
      <p style={{
        textAlign: 'center', color: '#68707a', fontSize: 16, marginBottom: 12
      }}>
        Select a mood below.<br />
        <span style={{ color: "#19202b", fontWeight: 600 }}>
          Each button opens a calming, non-YouTube resource for in-the-moment regulation and support.
        </span>
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 22,
          justifyContent: 'center',
          margin: '18px 0'
        }}
        aria-label="Mood options"
      >
        {moodResources.map(m => (
          <div
            key={m.emoji}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100 }}
          >
            <button
              style={{
                textDecoration: 'none',
                background: selected === m.label ? '#A5D6A7' : '#fff',
                border: selected === m.label ? '3px solid #4dd0e1' : '2px solid #eee',
                borderRadius: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 14,
                transition: 'background 0.18s, border 0.18s',
                cursor: 'pointer',
                filter: selected === m.label ? 'brightness(1.15)' : 'none',
                outline: 'none',
                minWidth: 68,
                minHeight: 68,
                boxShadow: selected === m.label ? '0 0 0 2px #FFF9C4' : 'none'
              }}
              aria-label={`Select mood: ${m.label} (opens resource)`}
              onClick={evt => handleMoodClick(evt, m)}
              onKeyDown={evt => handleMoodKeyDown(evt, m)}
              tabIndex={0}
              type="button"
            >
              <span style={{ fontSize: 37 }}>{m.emoji}</span>
              <span style={{
                marginTop: 7,
                fontSize: 14,
                color: selected === m.label ? '#08583C' : '#888',
                fontWeight: selected === m.label ? 600 : 400,
                textAlign: 'center'
              }}>
                {m.label}
              </span>
              <span style={{
                marginTop: 7, fontSize: 13, color: '#1976d2',
                textDecoration: "underline",
                fontWeight: 500,
                display: "block"
              }}>
                ▶️ Calming Resource
              </span>
            </button>
            {/* Extra explicit hint when selected */}
            {selected === m.label && (
              <div style={{
                marginTop: 5, fontSize: 12.5, color: "#333",
                background: "#B3E5FC", padding: "3px 8px",
                borderRadius: 6, fontWeight: 500
              }}>
                Resource opens in a new tab
              </div>
            )}
          </div>
        ))}
      </div>
      {selected &&
        <div style={{
          marginTop: 30,
          textAlign: 'center',
          background: '#FFF9C4',
          padding: 18,
          borderRadius: 12,
          color: '#222'
        }}>
          <MoodResource label={selected} />
        </div>
      }
    </section>
  );
}

/**
 * Displays resources/support content based on the selected mood. Only reputable, accessible, non-YouTube resources are used.
 */
/**
 * Shows a mood's heading, motivation or instruction, and a link to the mapped YouTube video. 
 */
/**
 * MoodResource: Maps mood label (case/space-insensitive) to heading, details, and always-correct YouTube link.
 */
 // PUBLIC_INTERFACE
function MoodResource({ label }) {
  const moodMap = {
    'calm': {
      heading: "You're calm!",
      url: "https://www.youtube.com/watch?v=eKFTSSKCzWA",
      text: "Keep enjoying your peace. Or, listen to this nature sound and birdsong video for continued calm."
    },
    'feeling anxious': {
      heading: "Feeling anxious?",
      url: "https://www.youtube.com/watch?v=aNXKjGFUlMs",
      text: "Try this quick guided breathing exercise video to help you relax and ground your feelings of anxiety."
    },
    'feeling angry': {
      heading: "Feeling angry?",
      url: "https://www.youtube.com/watch?v=pYnKJYIqp6A",
      text: "Take a moment with this white noise to cool down and reset your emotions."
    },
    'sad right now': {
      heading: "Sad right now?",
      url: "https://www.youtube.com/watch?v=26U_seo0a1g",
      text: "You are not alone. Watch this motivational encouragement video for supportive words and gentle affirmation."
    }
  };

  // Support case/style variations (e.g. 'Feeling Angry', 'Feeling angry', etc.)
  const key = (label || '').toLowerCase().trim();
  const mood = moodMap[key];
  if (!mood) return null;

  return (
    <div>
      <b>{mood.heading}</b>
      <p>{mood.text}</p>
      {mood.url && (
        <div style={{ margin: "12px 0" }}>
          <a
            href={mood.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, color: "#16475e", fontSize: 16, textDecoration: 'underline' }}
            aria-label={`Open calming resource for feeling ${label}`}
          >
            ▶️ Open Calming Resource
          </a>
        </div>
      )}
    </div>
  );
}

/**
 * Voice-to-Text Journal (voice/text entry, tag by mood, save with date)
 */
function Journal() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  // For accessibility: store selected mood
  const [mood, setMood] = useState('');
  // Speech Recognition support (voice-to-text)
  const [recognizing, setRecognizing] = useState(false);
  const recognitionRef = React.useRef(null);

  // Detect SpeechRecognition API
  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        let transcript = "";
        if (event.results && event.results[0] && event.results[0][0]) {
          transcript = event.results[0][0].transcript;
        }
        setText(prev => prev ? prev + " " + transcript : transcript);
      };
      recognitionRef.current.onerror = (event) => {
        setRecognizing(false);
      };
      recognitionRef.current.onend = () => {
        setRecognizing(false);
      };
    }
  }, []);

  // PUBLIC_INTERFACE
  function handleVoiceInput() {
    // Starts or stops recognition as needed
    if (!recognitionRef.current) return;
    if (recognizing) {
      recognitionRef.current.stop();
      setRecognizing(false);
    } else {
      setRecognizing(true);
      recognitionRef.current.start();
    }
  }

  // PUBLIC_INTERFACE
  function handleSave(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setEntries([{ text, mood, date: new Date().toLocaleString() }, ...entries]);
    setText('');
    setMood('');
  }

  return (
    <section aria-label="Journal">
      <h2 style={{ fontWeight: 700, fontSize: 23, margin: '18px 0 10px' }}>
        Journal Entry
      </h2>
      {/* Instructional message for using voice input */}
      <div
        aria-live="polite"
        style={{
          background: "#B3E5FC",
          color: "#0B2136",
          fontWeight: 600,
          fontSize: 17,
          borderRadius: 8,
          padding: "10px 17px",
          marginBottom: 17,
          textAlign: "center",
          boxShadow: "0 1px 8px rgba(179,229,252,0.15)"
        }}
      >
        Click the voice button to speak and click again once finished.
      </div>
      <form onSubmit={handleSave} style={{ marginBottom: 18 }}>
        <div>
          <textarea
            aria-label="Journal entry text"
            style={{
              fontSize: 18,
              borderRadius: 9,
              padding: 12,
              minHeight: 70,
              width: '98%',
              border: '2px solid #B3E5FC',
              marginBottom: 8
            }}
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={700}
            tabIndex={0}
          />
        </div>
        <div>
          <label>
            Mood:&nbsp;
            <select value={mood} onChange={e => setMood(e.target.value)} aria-label="Journal mood tag">
              <option value="">Select</option>
              <option value="😊">Joyful</option>
              <option value="😌">Calm</option>
              <option value="😢">Sad</option>
              <option value="😠">Angry</option>
              <option value="😰">Anxious</option>
            </select>
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
            <button
              type="button"
              style={{
                background: recognizing ? '#F7FAFE' : '#A5D6A7',
                color: recognizing ? "#16475e" : "#08583C",
                border: 'none',
                borderRadius: 9,
                fontSize: 18,
                fontWeight: 600,
                padding: '10px 26px',
                cursor: 'pointer',
                outline: recognizing ? "2px solid #0288d1" : "none"
              }}
              aria-label={recognizing ? "Stop voice input" : "Start voice input"}
              onClick={handleVoiceInput}
              disabled={typeof window === "undefined" || !(window.SpeechRecognition || window.webkitSpeechRecognition)}
            >
              🎤 {recognizing ? "Listening..." : "Voice"}
            </button>
            <button
              type="submit"
              style={{
                background: 'var(--primary)',
                color: '#16475e',
                border: 'none',
                borderRadius: 9,
                padding: '10px 30px',
                fontWeight: 600,
                fontSize: 18,
                cursor: 'pointer'
              }}
            >Save</button>
          </div>
        </div>
        {typeof window !== "undefined" && !(window.SpeechRecognition || window.webkitSpeechRecognition) && (
          <div style={{ color: "#B71C1C", marginTop: 10, fontSize: 14 }}>
            Voice input not supported on this browser/device.
          </div>
        )}
      </form>
      <div>
        <h3 style={{ margin: '10px 0' }}>Previous Entries</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {entries.length === 0 && <li style={{ color: '#777' }}>Your private entries will appear here.</li>}
          {entries.map((entry, i) => (
            <li key={i} style={{
              background: "#FFF9C4",
              borderRadius: 9, padding: 12, margin: '12px 0',
              color: "#222"
            }}>
              <div><span role="img" aria-label="Mood">{entry.mood}</span> <b>{entry.date}</b></div>
              <div>{entry.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CalmNestApp;
