// api/new-meetup
// POST /api/mew-meetup

import { MongoClient } from "mongodb";

// request obj => containing data about incoming req.
// response obj=> will be needed for sending req

// .connect()   => return promise : - we use async await.

async function handler(req, res) {
  // to check what kind of req is send here 'POST'

  if (req.method === "POST") {
    const data = req.body;

    //we insert this to database user insertOne{} below we pass data  => const { title, image, addres, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://NextJs:p09wxZ0eUIyWL5RB@cluster0.2chvv80.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
    );

    const db = client.db();

    const meetupsCollections = db.collection("meetups");

    const result = await meetupsCollections.insertOne( data );

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted" });
  }
}

export default handler;