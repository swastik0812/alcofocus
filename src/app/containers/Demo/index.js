import React, { useState ,useEffect} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { DatePicker } from "@material-ui/pickers";
import useStyles from "./useStyles";
import moment from "moment";
import axios from "axios";
import { Formik, setNestedObjectValues } from "formik";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
import List from "./list"
   

export default function SignUp() {
  const classes = useStyles();
  const [Filtered, setFiltered] = useState([])
  const [AllStudents, setStudents] = useState([{name:"manish",age:1,sex:"male"},{name:"kailask",age:105,sex:"male"},{name:"ravi",age:7,sex:"male"},{name:"vishnu",age:5,sex:"male"},{name:"inder",age:35,sex:"male"},{name:"shikha",age:2,sex:"female"},{name:"Baljeet",age:85,sex:"male"},{name:"nisha",age:25,sex:"female"},{name:"kanika",age:8,sex:"female"},{name:"nidhi",age:22,sex:"female"},{name:"pulkit",age:11,sex:"male"},{name:"anamika",age:45,sex:"female"}]);
  ;
  const history = useHistory();

  const filter =(val)=>{
    console.log(val)
    console.log("comes indside")

    if(val!=undefined && val.length !=0){
   let result = AllStudents.filter(value => val.every((f) => {
     console.log(typeof f)
     return f(value)
    }));
    console.log(result)
  setFiltered(result)
  }
  if(val.length == 0){
    console.log("comes heeeeeeeeee")
    setFiltered([])
  }
  }
  // useEffect(() => {
  //   filter();
  // }, []);
  console.log(Filtered)
 
  return (
   <div>
     <Grid container spacing={2}>
     <Grid item sm={3} xs={3} sm={3}>
     <List  forFilter={filter}/>
     </Grid>
     <Grid item sm={9} xs={9} sm={9}>
    <div style={{backgroundColor:"#b3d9fb",minHeight:380,marginTop:10 }}>
    <Grid container spacing={2}>
    <Grid item sm={6} xs={6} sm={6}>
     <div style={{marginLeft:50,marginTop:-10}}><p>Filtered List of students</p></div>
     {Filtered!=[] ?<div style={{marginLeft:50,marginTop:-10}}><ul>{Filtered.map((val,index)=>{
       return <li key={index}>{val.name}</li>
     })}</ul></div>:null}
     </Grid>
     <Grid item sm={6} xs={6} sm={6}>
       <div>List of all students</div>
     <div style={{marginLeft:50,marginTop:-10}}><ul>{AllStudents.map((val,index)=>{
       return <li key={index}>{val.name}{"  : age =>"}{val.age}{ "/"}{val.sex}</li>
     })}</ul></div>
     </Grid>
    </Grid>
    </div>
     </Grid>
     </Grid>

   </div>
  );
}
