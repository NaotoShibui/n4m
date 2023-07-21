import express, { Request, Response } from 'express';
import MaxAPI from 'max-api';

const app = express();
const port = 3000;

app.post('/control/1', (_req: Request, res: Response) => {
    MaxAPI.outlet(1);
    res.status(204);
    res.send();
});

app.post('/control/2', (_req: Request, res: Response) => {
    MaxAPI.outlet(2);
    res.status(204);
    res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
