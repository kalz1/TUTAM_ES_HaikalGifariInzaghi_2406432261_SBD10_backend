const userRepo = require('../repositories/userRepo');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await userRepo.findUserByUsername(username);
        if (existingUser) return res.status(400).json({ message: 'Username sudah dipakai' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await userRepo.createUser(username, hashedPassword);

        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userRepo.findUserByUsername(username);
        if (!user) return res.status(400).json({ message: 'Username tidak ditemukan' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password salah' });

        const token = generateToken(user.id);
        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};