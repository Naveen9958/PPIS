const express = require("express");
const cors = require("cors");
const pool = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM officers WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.json({
        success: false,
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      user: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// GET ALL OFFICERS
app.get("/officers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, role FROM officers ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// ADD OFFICER
app.post("/officers", async (req, res) => {
  const { full_name, email, password, role } = req.body;

  try {
    const badge_number = "OFF" + Date.now();

    const result = await pool.query(
      `
      INSERT INTO officers
      (full_name, badge_number, email, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [full_name, badge_number, email, password, role]
    );

    res.json({
      success: true,
      officer: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// DELETE OFFICER
app.delete("/officers/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM officers WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// GET CHECKPOINTS
app.get("/checkpoints", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM checkpoints ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success:false,
      error:err.message
    });
  }
});


// ADD CHECKPOINT
app.post("/checkpoints", async (req, res) => {
  const { checkpoint_name, location } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO checkpoints
      (checkpoint_name,location)
      VALUES($1,$2)
      RETURNING *
      `,
      [checkpoint_name,location]
    );

    res.json({
      success:true,
      checkpoint:result.rows[0]
    });

  } catch(err){

    console.error(err);

    res.status(500).json({
      success:false,
      error:err.message
    });

  }
});


// DELETE CHECKPOINT
app.delete("/checkpoints/:id", async (req,res)=>{

  try{

    await pool.query(
      "DELETE FROM checkpoints WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success:true
    });

  }catch(err){

    console.error(err);

    res.status(500).json({
      success:false,
      error:err.message
    });

  }

});


// PATROL LOGS
app.get("/patrol-logs", async(req,res)=>{

try{

const result=await pool.query(`
SELECT
patrol_logs.id,
officers.full_name,
checkpoints.checkpoint_name,
patrol_logs.scanned_at
FROM patrol_logs
JOIN officers
ON patrol_logs.officer_id=officers.id
JOIN checkpoints
ON patrol_logs.checkpoint_id=checkpoints.id
ORDER BY patrol_logs.scanned_at DESC
`);

res.json(result.rows);

}catch(err){

console.error(err);

res.status(500).json({
success:false,
error:err.message
});

}

});


// SIMULATE SCAN
app.post("/simulate-scan", async(req,res)=>{

const {officer_id,checkpoint_id}=req.body;

try{

const result=await pool.query(
`
INSERT INTO patrol_logs
(officer_id,checkpoint_id)
VALUES($1,$2)
RETURNING *
`,
[officer_id,checkpoint_id]
);

res.json({
success:true,
log:result.rows[0]
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
error:err.message
});

}

});


// DASHBOARD STATS
app.get("/dashboard-stats", async(req,res)=>{

try{

const officers=await pool.query(
"SELECT COUNT(*) FROM officers"
);

const checkpoints=await pool.query(
"SELECT COUNT(*) FROM checkpoints"
);

const patrolLogs=await pool.query(
"SELECT COUNT(*) FROM patrol_logs"
);

res.json({
officers:officers.rows[0].count,
checkpoints:checkpoints.rows[0].count,
patrolLogs:patrolLogs.rows[0].count
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
error:err.message
});

}

});


app.listen(5000,()=>{
console.log("🚔 RPIS Server Running On Port 5000");
});