import {
 FaHome,
 FaUsers,
 FaMapMarkerAlt,
 FaClipboardList
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#111827",
        padding: "20px",
        color: "white",
      }}
    >
      <h2 style={{ color: "#00e5ff" }}>
        🚔 RPIS
      </h2>

      <div style={{ marginTop: "40px" }}>
        <p><FaHome /> Dashboard</p>
        <p><FaUsers /> Officers</p>
        <p><FaMapMarkerAlt /> Checkpoints</p>
        <p><FaClipboardList /> Patrol Logs</p>
      </div>
    </div>
  );
}

export default Sidebar;