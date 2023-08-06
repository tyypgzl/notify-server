import mongoose from 'mongoose';

function connect() {
  const dbURI = process.env.MONGO_DB_URI;

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', (collection, method, query, doc) => {
      console.info(`${collection}.${method}`, JSON.stringify(query), doc);
    });
  }

  return mongoose
    .connect(dbURI, { dbName: 'notify' })
    .then(() => {
      console.info('Database connected');
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

export default connect;
