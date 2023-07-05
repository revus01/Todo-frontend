import React from "react";
import Paper from '@mui/material/Paper';
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointment,
    TodayButton,
} from "@devexpress/dx-react-scheduler";
import { appointments } from "./appointments";



export default function PrivateSchedule(){

    return (
        <Paper>
            <Scheduler
                data={appointments}
                height={660}
                >
                {/* <ViewState 
                    currentDate={"2018-06-27"}
                /> */}
            </Scheduler>

        </Paper>

    )
}