const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateTodo = async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(todo);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await todo.deleteOne();
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
}; 