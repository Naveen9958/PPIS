import { useEffect, useState } from "react";
import axios from "axios";

function PatrolLogs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/patrol-logs"
      );

      setLogs(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const simulateScan = async () => {
    try {
      await axios.post(
        "http://localhost:5000/simulate-scan",
        {
          officer_id: 1,
          checkpoint_id: 1,
        }
      );

      fetchLogs();

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>

      <h1>🚓 Patrol Logs</h1>

      <button
        onClick={simulateScan}
        style={{
          background:"#00e5ff",
          color:"black",
          border:"none",
          padding:"10px 20px",
          borderRadius:"10px",
          marginBottom:"20px",
          fontWeight:"bold"
        }}
      >
        🚓 Simulate QR Scan
      </button>

      <div
        style={{
          background:"rgba(255,255,255,.05)",
          borderRadius:"15px",
          overflow:"hidden",
          boxShadow:"0 0 20px rgba(0,229,255,.2)"
        }}
      >
        <table
          style={{
            width:"100%",
            borderCollapse:"collapse",
            color:"white"
          }}
        >

          <thead>

            <tr
              style={{
                background:"#111827"
              }}
            >
              <th style={styles.header}>
                ID
              </th>

              <th style={styles.header}>
                Officer
              </th>

              <th style={styles.header}>
                Checkpoint
              </th>

              <th style={styles.header}>
                Scanned Time
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.map((log)=>(
              <tr
                key={log.id}
                style={{
                  borderBottom:
                  "1px solid rgba(255,255,255,.1)"
                }}
              >

                <td style={styles.cell}>
                  {log.id}
                </td>

                <td style={styles.cell}>
                  {log.full_name}
                </td>

                <td style={styles.cell}>
                  {log.checkpoint_name}
                </td>

                <td style={styles.cell}>
                  {new Date(
                    log.scanned_at
                  ).toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}

const styles={

header:{
padding:"15px",
textAlign:"left",
color:"#00e5ff"
},

cell:{
padding:"15px"
}

};

export default PatrolLogs;