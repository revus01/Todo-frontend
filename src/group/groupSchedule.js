import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

export default function GroupSchedule({setJoined}) {

    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        axios.get(`/group/members?groupId=${1}`)
        .then(response => {console.log(response)})
        .catch(error => {alert("안됨")})
    },[])

    const dismissGroup = () => {
        axios.post("/group/dismiss", {
            groupId: userData.affiliation,
            userId: userData.uid
        }).then(() => {
            localStorage.setItem("userData",JSON.stringify(
                {...userData, affiliation: null}
            ))
            setJoined(false);

        })
    }

    return(

        <div>
            <Typography variant="h5" style={{color:"#000"}}>
                    
            </Typography>
            <Button style={{backgroundColor:"#CCC"}} onClick={() => {dismissGroup()}}>
                <Typography variant="h5" style={{color:"#000"}}>
                    그룹 탈퇴
                </Typography>
            </Button>
        </div>

    )

}