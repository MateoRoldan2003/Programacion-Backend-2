const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const moment = require('moment');
const nodemailer = require('nodemailer');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'first_name last_name email role');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

router.delete('/', async (req, res) => {
    try {
        const twoDaysAgo = moment().subtract(2, 'days');

        const result = await User.deleteMany({ lastConnection: { $lt: twoDaysAgo } });

        const transporter = nodemailer.createTransport({
        });

        for (const user of result) {
            await transporter.sendMail({
                to: user.email,
                subject: 'Eliminación de cuenta por inactividad',
                text: 'Tu cuenta ha sido eliminada debido a la inactividad.',
            });
        }

        res.json({ message: 'Usuarios inactivos eliminados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar usuarios inactivos' });
    }
});

module.exports = router;