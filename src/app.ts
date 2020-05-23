import './config/environment';
import Server from './server';

const { app } = new Server();

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
