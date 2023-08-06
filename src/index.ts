import app from './app';
import { dbConnect } from './utils';

const PORT = parseInt(process.env.PORT);
const HOST = process.env.HOST;

// SERVER
app.listen(PORT, HOST, async () => {
  await dbConnect();
  return console.log(`App started at http://${HOST}:${PORT}`);
});
