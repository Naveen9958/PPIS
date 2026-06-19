import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");

const handleLogin=async()=>{

try{

const res=await axios.post(
"http://localhost:5000/login",
{
email,
password
}
);

if(res.data.success){

onLogin(res.data.user);

}else{

setError("Invalid credentials");

}

}catch(err){

console.log(err);

setError("Server error");

}

};

return(

<div
style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:
"linear-gradient(135deg,#0b1220,#172554)",
color:"white"
}}
>

<div
style={{
width:"420px",
padding:"40px",
borderRadius:"25px",
background:"rgba(255,255,255,.06)",
backdropFilter:"blur(20px)",
boxShadow:"0 0 35px rgba(0,229,255,.2)",
border:"1px solid rgba(255,255,255,.1)"
}}
>

<div
style={{
textAlign:"center",
marginBottom:"30px"
}}
>

<div
style={{
fontSize:"55px"
}}
>
🚔
</div>

<h1
style={{
marginBottom:"5px",
color:"#00e5ff"
}}
>
PPIS
</h1>

<p
style={{
fontSize:"14px",
color:"#cbd5e1"
}}
>
Police Patrol Information System
</p>

<p
style={{
fontSize:"12px",
color:"#94a3b8",
marginTop:"8px"
}}
>
Authorized Personnel Access Only
</p>

</div>


<input
type="email"
placeholder="Official Email ID"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>


<button
style={styles.button}
onClick={handleLogin}
>
Secure Login
</button>

{
error &&
<p
style={{
color:"#ff6b6b",
marginTop:"15px",
textAlign:"center"
}}
>
{error}
</p>
}

<div
style={{
marginTop:"30px",
fontSize:"11px",
textAlign:"center",
color:"#64748b"
}}
>

Protected Government Network • RPIS v1.0

</div>

</div>

</div>

)

}

const styles={

input:{
width:"100%",
padding:"14px",
marginBottom:"15px",
borderRadius:"12px",
border:"1px solid rgba(255,255,255,.1)",
background:"rgba(255,255,255,.05)",
color:"white",
outline:"none",
fontSize:"14px"
},

button:{
width:"100%",
padding:"14px",
border:"none",
borderRadius:"12px",
background:"#00e5ff",
fontWeight:"bold",
cursor:"pointer",
fontSize:"15px"
}

}

export default Login;