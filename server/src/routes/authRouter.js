const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../../config/cookiesConfig');

const router = Router();

router.post('/signup', async (req, res) => {
  const { username, email, pass } = req.body;

  if (!username || !email || !pass) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  if (username && email && pass) {
    try {
      const hashedPassword = await bcrypt.hash(pass, 10);

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { username, pass: hashedPassword },
      });

      if (!created) {
        return res.status(403).json({ message: 'Пользователь уже существует' });
      }

      const plainUser = user.get();
      delete plainUser.pass;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.error('Ошибка при регистрации:', e);
      return res.status(500).json({ message: 'Ошибка сервера', error: e.message });
    }
  }
  return res.sendStatus(500);
});

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  if (email && pass) {
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!(await bcrypt.compare(pass, user.pass))) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const plainUser = user.get();
      delete plainUser.pass;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.error('Ошибка при входе:', e);
      return res.status(500).json({ message: 'Ошибка сервера', error: e.message });
    }
  }
  return res.sendStatus(500);
});

router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

// router.get('/:id/getTheme', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const user = await User.findOne({
//       where: { id },
//       attributes: ['theme'],
//     });
//     if (!user) {
//       return res.status(404).json({error: "Пользователь не найден"})
//     }

//     return res.json({theme: user.theme})
//   } catch (error) {
//     console.error('Ошибка получения темы:', error);
//     res.status(500).json({ error: 'Ошибка сервера' });
//   }
// })

// router.patch('/:id/updateTheme', async (req, res) => {
//   try {
//     const parseResult = UserSchema.pick({theme: true}).safeParse(req.body);
//     if (!parseResult.success) {
//       return res.status(400).json({ message: 'Некорректные данные', error: parseResult.error });
//     }

//     const { theme } = parseResult.data;

//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'Пользователь не найден' });
//     }

//     user.theme = theme;
//     await user.save();

//     res.status(200).json({ message: 'Тема обновлена', theme: user.theme });
//   } catch (error) {
//     console.error('Ошибка изменения темы оформления:', error);
//     res.status(500).json({ message: 'Ошибка изменения темы оформления' });
//   }
// });

module.exports = router;
