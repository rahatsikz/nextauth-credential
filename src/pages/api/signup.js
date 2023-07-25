const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.htrvoxc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    const userCollection = client.db("NextAuth").collection("user");

    if (req.method === "POST") {
      const data = req.body;

      const { email, password } = data;
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await userCollection.insertOne({
        email,
        password: hashedPassword,
      });
      res.send(result);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export default run;

export async function UserExists(email) {
  try {
    await client.connect();
    const userCollection = client.db("NextAuth").collection("user");
    return await userCollection.findOne({ email });
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}
