const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
//bla bla bla
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
