import "dotenv/config";
import "./db";
import "./models/Item";
import "./models/User";
import app from "./app";

const PORT = 8000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);