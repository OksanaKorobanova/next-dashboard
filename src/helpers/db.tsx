import { MongoClient } from 'mongodb';

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x8odhcm.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDb() {
  const client = await MongoClient.connect(connectionString);
  return client;
}

type newUser = {
  email: string;
  password: string;
};

export async function registerUser(client: MongoClient, newUser: newUser) {
  const db = client.db(process.env.DB_NAME);

  const result = await db.collection('users').insertOne(newUser);
  return result;
}
