
import { useState, useEffect } from "react";

function App() {
  const [shifts, setShifts] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    loadShifts();
  }, []);

  // Load shifts
  const loadShifts = async () => {
    const res = await fetch("https://shiftswap-tj4g.onrender.com/api/shifts");
    const data = await res.json();
    setShifts(data);
  };

  // Create shift
  const createShift = async () => {
    
if (!title.trim() || !time.trim()) {
  alert("Please enter both fields");
  return;
}

    await fetch("http://127.0.0.1:8000/api/shifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, time }),
    });

    loadShifts();

    setTitle("");
    setTime("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ShiftSwap App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <br /><br />

      <button onClick={createShift}>Add Shift</button>

      <hr />

      <button onClick={loadShifts}>Show Shifts</button>

      <ul>
        {shifts.map((shift, index) => (
          <li key={index}>
            {shift.title} - {shift.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
