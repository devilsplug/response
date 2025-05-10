const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/levels', require('./routes/levels'));
app.use('/api/avatars', require('./routes/avatars'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
