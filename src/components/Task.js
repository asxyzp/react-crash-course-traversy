import React from 'react'
import { FaTimesCircle } from 'react-icons/fa';

/**
 * FUNCTION : Task COMPONENT RENDERS INDIVIDUAL TASK DETAILS
 * FUNCTIONALITY : RENDERS INDIVIDUAL TASK COMPONENT
 * @param {*} {properties} : PROPERTIES OF THE TASK COMPONENT
 * @returns 
 */
const Task = ({ properties, onDelete, onToggle }) => {

    //<Task/>(JSX)
    return (
        <div onDoubleClick={() => { onToggle(properties.id) }} className={`task rounded p-2 m-2 d-flex justify-content-between align-items-center ${properties.reminder ? "border-5 border-start border-danger" : ""}`}>
            <div>
                <div className="fw-bolder">{properties.text}</div>
                <div>{properties.day}</div>
            </div>
            <FaTimesCircle onClick={() => { onDelete(properties.id) }} className="text-danger" />
        </div>
    );
};

export default Task
