const http = require("http");
const { MongoClient } = require("mongodb");

const PORT = process.env.APP_PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongodb:27017/myapp";

const client = new MongoClient(MONGO_URL);

async function startServer() {
    try {
        await client.connect();

        console.log("Connected to MongoDB successfully!");

        const db = client.db("myapp");
        const messages = db.collection("messages");

        const server = http.createServer(async (req, res) => {
            res.setHeader("Content-Type", "application/json");

            if (req.url === "/") {
                res.writeHead(200);
                res.end(JSON.stringify({
                    message: "Node.js + MongoDB Docker App is running!"
                }));

            } else if (req.url === "/health") {
                res.writeHead(200);
                res.end(JSON.stringify({
                    status: "OK",
                    database: "MongoDB connected"
                }));

            } else if (req.url === "/add") {
                const result = await messages.insertOne({
                    message: "Hello from Docker!",
                    createdAt: new Date()
                });

                res.writeHead(201);
                res.end(JSON.stringify({
                    message: "Data inserted successfully",
                    id: result.insertedId
                }));

            } else if (req.url === "/messages") {
                const data = await messages.find().toArray();

                res.writeHead(200);
                res.end(JSON.stringify(data));

            } else {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "Route not found"
                }));
            }
        });

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

startServer();
