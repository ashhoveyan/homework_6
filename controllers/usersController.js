const users = [];

export default {
    register  (req, res)  {
        const { fName, lName, email, password } = req.body;
        const user = { id: users.length + 1, fName, lName, email, password };
        users.push(user);
        res.status(201).json({ message: 'User registered successfully', user });
    },
    login  (req, res)  {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                res.status(200).json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
    },
    getUsersList (req, res) {
        res.status(200).json(users);
    },
    getUserProfile(req, res)  {
    const user = users.find(u => u.id === parseInt(req.params.id));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    },
    updateUserProfile  (req, res)  {
        const { id } = req.params;
        const { fName, lName, email, password } = req.body;
        const user = users.find(u => u.id === parseInt(id));
        if (user) {
            user.fName = fName;
            user.lName = lName;
            user.email = email;
            user.password = password;
            res.status(200).json({ message: 'User updated successfully', user });
        } else {
                res.status(404).json({ message: 'User not found' });
            }
    },
    deleteUser  (req, res)  {
        const { id } = req.params;
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            users.splice(index, 1);
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}