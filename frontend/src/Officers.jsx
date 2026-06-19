import { useEffect, useState } from "react";
import axios from "axios";

function Officers(){

const [officers,setOfficers]=useState([]);

const [formData,setFormData]=useState({
full_name:"",
email:"",
password:"",
role:"Officer"
});

const fetchOfficers=async()=>{

try{

const res=await axios.get(
"http://localhost:5000/officers"
);

setOfficers(res.data);

}catch(err){

console.log(err);

}

};

useEffect(()=>{

fetchOfficers();

},[]);


const addOfficer=async()=>{

try{

await axios.post(
"http://localhost:5000/officers",
formData
);

setFormData({
full_name:"",
email:"",
password:"",
role:"Officer"
});

fetchOfficers();

}catch(err){

console.log(err);

}

};


const deleteOfficer=async(id)=>{

try{

await axios.delete(
`http://localhost:5000/officers/${id}`
);

fetchOfficers();

}catch(err){

console.log(err);

}

};

return(

<div>

<h1>👮 Officers</h1>

<div style={styles.form}>

<input
placeholder="Full Name"
value={formData.full_name}
onChange={(e)=>setFormData({
...formData,
full_name:e.target.value
})}
/>

<input
placeholder="Email"
value={formData.email}
onChange={(e)=>setFormData({
...formData,
email:e.target.value
})}
/>

<input
placeholder="Password"
value={formData.password}
onChange={(e)=>setFormData({
...formData,
password:e.target.value
})}
/>

<select
value={formData.role}
onChange={(e)=>setFormData({
...formData,
role:e.target.value
})}
>
<option>Officer</option>
<option>Admin</option>
</select>

<button
style={styles.addButton}
onClick={addOfficer}
>
Add Officer
</button>

</div>


<div style={styles.tableContainer}>

<table style={styles.table}>

<thead>

<tr>

<th style={styles.header}>ID</th>
<th style={styles.header}>Name</th>
<th style={styles.header}>Email</th>
<th style={styles.header}>Role</th>
<th style={styles.header}>Action</th>

</tr>

</thead>

<tbody>

{officers.map((officer)=>(

<tr key={officer.id}>

<td style={styles.cell}>{officer.id}</td>
<td style={styles.cell}>{officer.full_name}</td>
<td style={styles.cell}>{officer.email}</td>
<td style={styles.cell}>{officer.role}</td>

<td style={styles.cell}>

<button
style={styles.deleteButton}
onClick={()=>deleteOfficer(officer.id)}
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

export default Officers;