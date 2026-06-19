import { useEffect,useState } from "react";
import axios from "axios";

function Checkpoints(){

const [checkpoints,setCheckpoints]=useState([]);

const [formData,setFormData]=useState({
checkpoint_name:"",
location:""
});

const fetchCheckpoints=async()=>{

try{

const res=await axios.get(
"http://localhost:5000/checkpoints"
);

setCheckpoints(res.data);

}catch(err){

console.log(err);

}

};

useEffect(()=>{

fetchCheckpoints();

},[]);


const addCheckpoint=async()=>{

try{

await axios.post(
"http://localhost:5000/checkpoints",
formData
);

setFormData({
checkpoint_name:"",
location:""
});

fetchCheckpoints();

}catch(err){

console.log(err);

}

};


const deleteCheckpoint=async(id)=>{

try{

await axios.delete(
`http://localhost:5000/checkpoints/${id}`
);

fetchCheckpoints();

}catch(err){

console.log(err);

}

};

return(

<div>

<h1>📍 Checkpoints</h1>

<div style={styles.form}>

<input
placeholder="Checkpoint Name"
value={formData.checkpoint_name}
onChange={(e)=>setFormData({
...formData,
checkpoint_name:e.target.value
})}
/>

<input
placeholder="Location"
value={formData.location}
onChange={(e)=>setFormData({
...formData,
location:e.target.value
})}
/>

<button
style={styles.addButton}
onClick={addCheckpoint}
>
Add Checkpoint
</button>

</div>


<div style={styles.tableContainer}>

<table style={styles.table}>

<thead>

<tr>

<th style={styles.header}>ID</th>
<th style={styles.header}>Checkpoint</th>
<th style={styles.header}>Location</th>
<th style={styles.header}>Action</th>

</tr>

</thead>

<tbody>

{checkpoints.map((checkpoint)=>(

<tr key={checkpoint.id}>

<td style={styles.cell}>
{checkpoint.id}
</td>

<td style={styles.cell}>
{checkpoint.checkpoint_name}
</td>

<td style={styles.cell}>
{checkpoint.location}
</td>

<td style={styles.cell}>

<button
style={styles.deleteButton}
onClick={()=>deleteCheckpoint(checkpoint.id)}
>
🗑 Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}

const styles={

form:{
display:"flex",
gap:"10px",
marginBottom:"20px",
flexWrap:"wrap"
},

tableContainer:{
background:"rgba(255,255,255,.05)",
borderRadius:"15px",
overflow:"hidden",
boxShadow:"0 0 20px rgba(0,229,255,.2)"
},

table:{
width:"100%",
color:"white",
borderCollapse:"collapse"
},

header:{
padding:"15px",
background:"#111827",
color:"#00e5ff"
},

cell:{
padding:"15px"
},

addButton:{
background:"#00e5ff",
border:"none",
padding:"10px",
borderRadius:"8px",
cursor:"pointer"
},

deleteButton:{
background:"#ff4444",
border:"none",
padding:"8px",
borderRadius:"8px",
cursor:"pointer",
color:"white"
}

}

export default Checkpoints;