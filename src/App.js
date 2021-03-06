import "./style/style.css";
import Tasks from "./components/Tasks";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTask from "./components/AddTask";
import React, { useState, useEffect } from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

    //STATES
    const [tasks, setTasks] = useState([]);                           //SETS TASKS STATE
    const [showTaskForm, setShowTaskForm] = useState(false);          //SETS STATE FOR SHOWING TASK FORM  

    //HOOKS
    //USE EFFECT HOOK DEALS WITH SIDE-EFFECTS
    useEffect(()=>{  
        const getTasks = async () =>{                                //GETTING FETCHED TASKS
            const getData =  await fetchTasks();    
            setTasks(getData);
        };
        getTasks();
    },[]);

    //METHODS
    /**
     * FUNCTION : FETCH TASK LIST FROM THE DATABASE
     * FUNCTIONALITY : FETCHING TASKS FROM THE FAKE API
     * @param : UNDEFINED
     * @returns : TASK LIST
     */
    async function fetchTasks (id) {
        if(!id){
            const res = await fetch("http://localhost:5000/tasks");
            const data = await res.json();
            return data;
        }
        else{
            const res = await fetch(`http://localhost:5000/tasks/${id}`);
            const data = await res.json();
            return data;
        }
    };

    /**
     * FUNCTION : deleteTask(id)
     * FUNCTIONALITY : DELETING/REMOVING TASKS FROM THE TASK STATE WITH A PARTICULAR ID  
     * @param {*} id : ID OF THE TASK WHICH NEEDS TO BE DELETED
     * @returns : UNDEFINED
     */
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {"method":"DELETE",});
        tasks.filter((task) => {
            setTasks(tasks.filter((task, index, array) => {
                if (task.id !== id)
                    return task;
            }));
        });
    };

    /**
     * FUNCTION : toggleTask(id)
     * FUNCTIONALITY : TOGGLE THE REMINDER VALUE OF TASKS
     * @param {*} id : ID OF THE TOGGLED TASK
     * @returns : UNDEFINED
     */
    const toggleTask = async (id) => {
        let taskObj = await fetchTasks(id);
        taskObj = {...taskObj, "reminder": !taskObj.reminder};
        await fetch(
            `http://localhost:5000/tasks/${id}`,
            { 
                "method": "PUT",
                "headers": {"Content-Type": "application/json"},
                "body": JSON.stringify(taskObj)
            });
        setTasks(
            tasks.map((task) => {
                if (task.id === id) task.reminder = !task.reminder;
                return task
            }
            ));
    };


    return (
        <Router>
            <div className="app border border-dark p-3">
                <Header onAdd={() => setShowTaskForm(!showTaskForm)} showAddForm={showTaskForm}/>
                {showTaskForm && <AddTask tasks={tasks} setTasks={setTasks} />}                   
                <Route  
                    path="/" exact render={
                        (props)=>{
                            {
                                return (
                                    <>
                                        {
                                            tasks.length > 0 ? 
                                            <Tasks tasks={tasks} setTasks={setTasks} onDelete={deleteTask} onToggle={toggleTask} className="mt-3" /> : 
                                            <div className="m-2">No tasks to show</div>
                                        }
                                        <Footer/>
                                    </>
                                ); 
                            };
                        }
                    }/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
    );
}

export default App;
