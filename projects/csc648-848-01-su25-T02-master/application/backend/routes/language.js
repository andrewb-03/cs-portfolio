const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

module.exports = (db) => {
  router.put('/', async (req, res) => {
    const userId = req.session.userId;
    const { language } = req.body;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!['en', 'es', 'hi'].includes(language)) return res.status(400).json({ message: 'Invalid language' });

    await UserModel.updateUserLanguage(db, userId, language);
    req.session.language = language;
    res.json({ message: 'Language updated', language });
  });

  router.get('/', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const user = await UserModel.findUserById(db, userId);
    res.json({ language: user.language || 'en' });
  });

  return router;
};