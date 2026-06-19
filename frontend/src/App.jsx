import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./Login";
import Officers from "./Officers";
import Checkpoints from "./Checkpoints";
import PatrolLogs from "./PatrolLogs";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  const [stats, setStats] = useState({
    officers: 0,
    checkpoints: 0,
    patrolLogs: 0,
  });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/dashboard-stats"
      );

      setStats(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0b1220",
        color: "white"
      }}
    >

      {/* Sidebar */}

      <div
        style={{
          width: "250px",
          background: "#111827",
          padding: "25px",
          borderRight: "1px solid rgba(255,255,255,.1)"
        }}
      >
<h2 style={{ color:"#00e5ff" }}>
🚔 PPIS
</h2>

        <div style={{ marginTop:"40px" }}>

          <p
            style={{cursor:"pointer"}}
            onClick={()=>setPage("dashboard")}
          >
            🏠 Dashboard
          </p>

          <br/>

          <p
            style={{cursor:"pointer"}}
            onClick={()=>setPage("officers")}
          >
            👮 Officers
          </p>

          <br/>

          <p
            style={{cursor:"pointer"}}
            onClick={()=>setPage("checkpoints")}
          >
            📍 Checkpoints
          </p>

          <br/>

          <p
            style={{cursor:"pointer"}}
            onClick={()=>setPage("patrolLogs")}
          >
            🚓 Patrol Logs
          </p>

          <br/>

          <p
            style={{
              cursor:"pointer",
              color:"#ff6666"
            }}
            onClick={()=>setUser(null)}
          >
            🚪 Logout
          </p>

        </div>

      </div>


      {/* Main content */}

      <div
        style={{
          flex:1,
          padding:"30px"
        }}
      >

        {page==="dashboard" && (

          <>
            <h1>
               Smart Patrol Dashboard
            </h1>

            <p style={{color:"#aaa"}}>
              Welcome, {user.full_name}
            </p>

            <br/>

            <div
              style={{
                display:"flex",
                gap:"20px",
                flexWrap:"wrap"
              }}
            >

              <Card
                title="Officers"
                value={stats.officers}
              />

              <Card
                title="Checkpoints"
                value={stats.checkpoints}
              />

              <Card
                title="Patrol Logs"
                value={stats.patrolLogs}
              />

            </div>

          </>
        )}

        {page==="officers" && <Officers />}

        {page==="checkpoints" && <Checkpoints />}

        {page==="patrolLogs" && <PatrolLogs />}

      </div>

    </div>
  );
}


function Card({title,value}){

return(

<div
style={{
background:"rgba(255,255,255,.05)",
padding:"25px",
borderRadius:"20px",
width:"250px",
backdropFilter:"blur(15px)",
boxShadow:"0 0 20px rgba(0,229,255,.2)"
}}
>

<h3>{title}</h3>

<h1
style={{
marginTop:"15px",
color:"#00e5ff"
}}
>
{value}
</h1>

</div>

)

}

export default App;