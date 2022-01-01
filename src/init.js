import app from "./app";
import "./db";
import "./models/Item";
import "./models/User";

const PORT = 8000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);