const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "O e-mail já está em uso." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.status(201).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar o usuário." });
    }
};

exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await user.update({
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword
        });

        const updatedUserData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.json(updatedUserData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o usuário." });
    }
};