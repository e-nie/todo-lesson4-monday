import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import CheckBox from "./components/CheckBox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>('')

    const addTask = () => {
        if (title.trim()) { // ❓
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const buttonsColorHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
        setButtonName(value)
    }

    const changeIsDoneHandler = (tId: string, isDone:boolean) => {
        props.changeIsDone(tId, isDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className = {error ? styles.error : ''}
                   value = {title}
                   onChange = {onChangeHandler}
                   onKeyPress = {onKeyPressHandler}
            />
            <button onClick = {addTask}>+</button>
            {/*❗️*/}
            {error && <div className = {styles.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    // const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeIsDone(t.id, e.currentTarget.checked)
                    // }
                    return <li key = {t.id} className={t.isDone ? styles.isDone: ''}>
                        <CheckBox checked={t.isDone}
                        callBack={(isDone)=> changeIsDoneHandler(t.id, isDone )}/>
                        {/*<input type = "checkbox" checked = {t.isDone} onChange = {changeIsDoneHandler} />*/}
                        <span>{t.title}</span>
                        <button onClick = {onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className = {buttonName === 'all' ? styles.activeFilter:''} onClick = {()=>buttonsColorHandler('all')}>All</button>
            <button className = {buttonName=== 'active' ? styles.activeFilter :''} onClick = {()=>buttonsColorHandler('active')}>Active</button>
            <button className = {buttonName === 'completed' ? styles.activeFilter : ''} onClick = {()=>buttonsColorHandler('completed')}>Completed</button>
        </div>
    </div>
}
