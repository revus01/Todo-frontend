import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {  ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { SpeedDial, Modal, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import AddTodo from '../addTodo';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 3,
};

export default function UserSchedulePage() {

  const userData = JSON.parse(localStorage.getItem("userData"))

  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());

  const[todolist, setTodoList] = useState([])

  const[data, setData] = useState([]);

  const[open, setOpen] = useState(false);

  useEffect(() => {

    if(userData === null){
        navigate("/login")
    }else{
        axios.post(`/todo/list/${userData.uid}`)
        .then(response => {
          let temp = []
          const todo = response.data
          todo.map((date) => {
            temp.push({
              title:date.title,
              startDate: new Date(date.startTime),
              endDate : new Date(date.endTime),
              id : date.id
            })
          })


          setData(temp)
          console.log(temp)
        })
        .catch(error => console.log("error"))
    }}, []);

    const reload = () => {
      console.log("executed")
      axios.post(`/todo/list/${userData.uid}`)
      .then(response => {
        let temp = []
        const todo = response.data
        todo.map((date) => {
          temp.push({
            title:date.title,
            startDate: new Date(date.startTime),
            endDate : new Date(date.endTime),
            id : date.id
          })
        })


        setData(temp)
        console.log(temp)
      })
      .catch(error => console.log(error))
    }



    const currentDateChange = (date) =>{
        setCurrentDate(date);
    }

    return(
      <>
          <Paper>
                <Scheduler
                data={data}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={currentDateChange}
                    />
                    <EditingState
                      onCommitChanges={({deleted})=>{
                        if(deleted){
                          axios.delete(`/todo/delete/${deleted}`)
                          .then(()=>{reload(); alert("일정이 제거되었습니다.")})
                          .catch(error => console.log(error))
                        }
                      }}
                    />
                    <IntegratedEditing />
                    <WeekView
                        startDayHour={6}
                        endDayHour={24}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    <AppointmentTooltip
                      showCloseButton
                      showDeleteButton
                    />

                    
                </Scheduler>
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: 'absolute', bottom: 30, right: 30 }}
                  icon = {<Add />}
                  onClick={()=>setOpen(true)}
                />
        </Paper>
        <Modal
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            <Box sx={style}>
              <AddTodo reload={reload} setOpen={setOpen} />
            </Box>

        </Modal>
        </>
    )
}