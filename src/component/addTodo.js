import React, { useState } from "react";
import { Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./addTodo.css"
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";



const AddTodo = ({reload}) => {

    const[title, setTitle] = useState('');
    const[startTime, setStartTime] = useState(null);
    const[endTime, setEndTime] = useState(null);

    const userData = JSON.parse(localStorage.getItem("userData"))



    const addTodo = () => {

        if(title.length !== 0 && startTime !== null && endTime !== null ){
            axios.post('/todo/add',{
                id: 0,
                createdUser: userData.uid,
                title: title,
                isComplete: false,
                startTime: moment(startTime.toString()).format("YYYY-MM-DDThh:mm"),
                endTime:moment(endTime.toString()).format("YYYY-MM-DDThh:mm")
            }).then(async (response) => {
                setTitle("")
                setStartTime(null)
                setEndTime(null)
                await reload()
            }).catch(error => console.log(error))
        }
    }

    return(
        <div className="structure">
            <Fab color="primary" aria-label="add" onClick={addTodo}>
                <AddIcon />
            </Fab>
            <div className="input">
                <TextField id="outlined-basic" label="해야 할 일" variant="outlined" style={{margin:"10px"}} value = {title} 
                onChange={(event) => {
                    setTitle(event.target.value);
                    }}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div style={{display:'flex', flex:1, flexDirection:"row", justifyContent:"space-around", height:50}} >
                        <div style={{flex:2, margin:10, justifyContent:"center", display:"flex"}}>
                            <DesktopDateTimePicker label="시작 시간" value={startTime}  onChange={(value) => setStartTime(value)}/>
                            <DesktopDateTimePicker label="종료 시간" value={endTime}  onChange={(value) => setEndTime(value)}/>
                        </div>
                        
                
                    </div>
                </LocalizationProvider>
            </div>
        </div>
    )
}

export default AddTodo