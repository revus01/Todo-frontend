import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const data = [
    {
        groupId : 1,
        ownerId : 101,
        groupName : '플레토로보틱스',
    },
    {
        groupId : 2,
        ownerId : 102,
        groupName : '축구 동아리',
    },
    {
        groupId : 3,
        ownerId : 103,
        groupName : '카이스트 학생회',
    },
]

const dataTemplate = {
    "groupId": 2,
    "ownerId": 101,
    "groupName": "플레토로보틱스"
  }

export default function GroupRegister({setJoined}) {

    const userData = JSON.parse(localStorage.getItem("userData"));

    const [groupList, setGroupList] = useState([]);

    useEffect(()=> {

        axios.get("/group/list").then((response) => {setGroupList(response.data)})
        .catch((error) => console.log(error));

    },[])

    const enrollGroup = (groupId) => {
        axios.post("/group/enroll",{
            groupId : groupId,
            userId : userData.uid
        }).then((response) => {
            setJoined(true)
            localStorage.setItem("userData",JSON.stringify(
                {...userData, affiliation: groupId}
            ))
        })
        .catch((error) => console.log(error));
    }

    return(
        <div>
            <Typography variant="h4">
                참여 가능한 그룹
            </Typography>
            {
                groupList.map((group) => (
                    <div key={group.groupId}>
                        <Typography variant="h5">
                            {group.groupName}
                        </Typography>
                        <Typography>
                            {group.groupDescription}
                        </Typography>
                        <Button style={{backgroundColor : "#AAA"}} onClick={()=>enrollGroup(group.groupId)} >
                            <Typography style={{color:"#333"}} >
                                등록
                            </Typography>
                        </Button>
                    </div>
                ))
            }

        </div>
    
        
        

    )

}
