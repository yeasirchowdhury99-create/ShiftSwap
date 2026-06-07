
import { useState, useEffect } from "react";

function App() {
  const [shifts, setShifts] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    loadShifts();
  }, []);

  // ✅ Load shifts
  const loadShifts = async () => {
    const res = await fetch("https://shiftswap-tj4g.onrender.com/api/shifts");
    const data = await res.json();
    setShifts(data);
  };

  // ✅ Create shift
  const createShift = async () => {
    if (!title.trim() || !time.trim()) {
      alert("Please enter both fields");
      return;
    }

    await fetch("https://shiftswap-tj4g.onrender.com/api/shifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, time }),
    });

    // ✅ delay fix
    setTimeout(() => {
      loadShifts();
    }, 500);

    setTitle("");
    setTime("");
  };

  // ✅ DELETE FUNCTION (NEW FEATURE)
  const deleteShift = async (id) => {
    await fetch(`https://shiftswap-tj4g.onrender.com/api/shifts/${id}`, {
      method: "DELETE",
    });

    setTimeout(() => {
      loadShifts();
    }, 500);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>ShiftSwap App</h1>

      {/* ✅ INPUTS */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "10px", margin: "5px", width: "200px" }}
      />
      <br />

      <input
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ padding: "10px", margin: "5px", width: "200px" }}
      />
      <br />

      {/* ✅ ADD BUTTON */}
      <button
        onClick={createShift}
        style={{
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Add Shift
      </button>

      <hr style={{ margin: "20px" }} />

      {/* ✅ SHOW BUTTON */}
      <button
        onClick={loadShifts}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2ecc71",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Show Shifts
      </button>

      {/* ✅ DISPLAY SHIFTS */}
      <div>
        {shifts.map((shift) => (
          <div
            key={shift.id}
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              color: "#34495e",
            }}
          >
            {shift.title} - {shift.time}

            {/* ✅ DELETE BUTTON */}
            <button
              onClick={() => deleteShift(shift.id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
