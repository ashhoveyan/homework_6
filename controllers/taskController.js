import {v4 as uuidv4} from 'uuid';
import validate from "../utils/validate.js";

const tasks = [];

export default {
    createTask(req, res) {
        const {title, description, completionDate} = req.body;

        if (!validate.validateTask(title, description)) {
            return res.status(400).json({message: 'Invalid task data'});
        }

        const todayTasks = tasks.filter(task => isSameDay(new Date(task.createdAt), new Date()));

        if (todayTasks.length >= 3) {
            return res.status(400).json({message: 'Maximum 3 tasks allowed per day'});
        }

        const now = new Date();
        const completionDateTime = new Date(completionDate);

        if (completionDateTime <= now) {
            return res.status(400).json({message: 'Completion date must be in the future'});
        }

        const newTask = {
            id: uuidv4(),
            title,
            description,
            createdAt: now,
            completionDate: completionDateTime,
        };

        tasks.push(newTask);
        res.status(201).json(newTask);
    },
    getTasks(req, res) {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const sortedTasks = tasks.slice().sort((a, b) => b.createdAt - a.createdAt);

        const paginatedTasks = sortedTasks.slice(startIndex, endIndex);

        res.status(200).json({
            page,
            perPage,
            totalPages: Math.ceil(sortedTasks.length / perPage),
            tasks: paginatedTasks,
        });
    },
    getSingleTask(req, res) {
        const {id} = req.params;
        const task = tasks.find((task) => task.id === id);

        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        res.status(200).json(task);
    },
    updateTask(req, res) {
        if (tasks.length > 0 && req.params.id) {
            const task = tasks.find((task) => task.id === req.params.id);
            task.title = req.body.title;
            task.description = req.body.description;
            task.taskDate = req.body.taskDate;
            res.send(200, JSON.stringify(task));

        }
        res.send(400, JSON.stringify({"message": "doesn't find this task"}))
    },
    deleteTask(req, res) {
        if (tasks.length > 0 && req.params.id) {
            const task = tasks.find((task) => task.id === req.params.id);
            if (task) {
                tasks.splice(tasks.indexOf(task), 1);
                res.send(200, JSON.stringify({"message": "task is deleted"}));
            } else {
                res.send(400, JSON.stringify({"message": "dont find this task"}));
            }
        }
    },


}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}