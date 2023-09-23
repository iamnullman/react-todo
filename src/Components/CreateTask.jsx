import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateTask({ tasks, setTasks }) {
    const [task, setTask] = useState({
        name: '',
        id: '',
        status: 'todo',
    })
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!task.name) return toast('Task name is required', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })
        if (tasks.find((t) => t.name === task.name)) return toast('Task already exists', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })
        if (task.name.length < 3) return toast('Task name must be at least 3 characters', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })
        if (task.name.length > 20) return toast('Task name must be less than 20 characters', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })

        setTasks((prev) => {
            const list = [...prev, task]

            localStorage.setItem('tasks', JSON.stringify(list))

            return list
        })
        setTask({
            name: '',
            id: '',
            status: 'todo',
        })

        toast.success('Task created successfully', { icon: <i className="fa-solid fa-party-horn text-green-900 font-bold" />, className: "font-bold" })
    }
    return (

        <form onSubmit={handleSubmit}>
            <input
                onChange={(e) => {
                    setTask({ ...task, name: e.target.value, id: uuidv4() })
                }}
                type="text"
                value={task.name}
                className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
            />
            <button className="bg-indigo-500 rounded-md px-4 h-12 text-white">Create</button>
        </form>
    )
};