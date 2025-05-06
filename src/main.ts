import app from './server';

const PORT = process.env.PORT || 80;

app.listen(80, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
