const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Creating user with:', { username, email, hashedPassword });  // Log para depuración

        const user = await User.create({ username, email, password: hashedPassword });

        // Generar un nuevo token para el usuario registrado
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        console.error('Error registering user:', error);  // Log para depuración
        if (!res.headersSent) {  // Verificar si los encabezados ya han sido enviados
            res.status(500).json({ error: 'Failed to register user' });
        }
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generar el token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
        const user = await User.findByPk(userId); // Buscar el usuario por su ID

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generar el token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
        const user = await User.findByPk(userId); // Buscar el usuario por su ID

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
};
