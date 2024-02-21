/* eslint-disable no-console */
import { app } from './app';
import 'dotenv/config';

const PORT: number = Number(process.env.PORT);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}..`);
});
