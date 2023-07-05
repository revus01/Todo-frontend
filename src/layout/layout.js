import React, { useEffect, useState } from "react";
import axios from "axios";
import ListPage from "../component/listPage";
import "./layout.css"
import AddTodo from "../component/addTodo";
import TodoHead from "../component/TodoHeader";



const Layout = () => {

    const userData = JSON.parse(localStorage.getItem("userData"))

    useEffect(() => {
        axios.post('/todo/list',userData)
        .then(response => {setTodoList(response.data); console.log(response)})
        .catch(error => console.log(userData.uid))
    }, []);

    const reload = () => {
        console.log("executed")
        axios.post('/todo/list',userData)
        .then(async response => {await setTodoList(response.data); console.log(response)})
        .catch(error => console.log(error))
    }

    const dbAlloc = () => {
        if(todolist.length === 0) return(0)
        else return(Math.max(...todolist.map(o => o.id)))
    }

    const[todolist, setTodoList] = useState([])

    return (
        <>

                <TodoHead/>
                <ListPage todolist={todolist} reload={reload} />
                <div style = {{ alignItems:"center", justifyContent:"center",   display:"flex"}}>
                    <AddTodo reload={reload} dbAlloc = {dbAlloc}/>
                </div>




        </>
    )
}

export default Layout