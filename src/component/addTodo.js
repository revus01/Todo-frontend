import React, { useState } from "react";
import { Fab, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./addTodo.css"
import axios from "axios";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css"



const AddTodo = ({reload, setOpen}) => {

    const[title, setTitle] = useState('');
    const[startTime, setStartTime] = useState(null);
    const[endTime, setEndTime] = useState(null);


    const userData = JSON.parse(localStorage.getItem("userData"))



    const addTodo = () => {

        if(title.length !== 0 && startTime !== null && endTime !== null &&
            moment.duration(moment(endTime).diff(moment(startTime))).asHours() < 24){
            axios.post('/todo/add',{
                id: 0,
                createdUser: userData.uid,
                title: title,
                isComplete: false,
                startTime: moment(startTime.toString()).format("YYYY-MM-DDTHH:mm"),
                endTime:moment(endTime.toString()).format("YYYY-MM-DDTHH:mm")
            }).then(async (response) => {
                setTitle("")
                setStartTime(null)
                setEndTime(null)
                setOpen(false)
                alert("새로운 일정이 추가되었습니다")
                await reload()
            }).catch(error => console.log(error))
        }
    }

    return(
        <div className="structure">
            <Typography fontSize={24} >일정 추가</Typography>
            <div className="input">
                <TextField id="outlined-basic" label="해야 할 일" variant="outlined" style={{margin:"10px"}} value = {title} 
                onChange={(event) => {
                    setTitle(event.target.value);
                    }}/>
                    <ReactDatePicker 
                        selected={startTime}
                        placeholderText="시작 시간"
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="yyyy MM dd HH:mm"
                        value={startTime}
                        onChange={(date) => setStartTime(date)} />
                    <ReactDatePicker 
                        selected={endTime}
                        placeholderText="종료 시간"
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="yyyy MM dd HH:mm"
                        value={endTime}
                        onChange={(date) => setEndTime(date)} />
            </div>
            <Fab color="primary" aria-label="add" onClick={addTodo}>
                <AddIcon />
            </Fab>
            

        </div>
    )
}

export default AddTodo