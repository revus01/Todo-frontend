import React, { useEffect, useState } from "react";
import GroupSchedule from "./groupSchedule";
import GroupRegister from "./groupRegister";



export default function GroupPage() {

    const userData = JSON.parse(localStorage.getItem("userData"))

    const[joined,setJoined] = useState(true);

    useEffect(()=>{
        if(!userData.affiliation) {
            setJoined(false)
        }
    })

    return(
        joined
            ? <GroupSchedule setJoined={setJoined} />
            : <GroupRegister setJoined={setJoined} />
        

    )


}