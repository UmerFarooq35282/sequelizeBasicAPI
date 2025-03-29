import express from 'express'
import router from './routes/appRoutes.js';
import cors from 'cors'
import userRoute from './routes/usersRoute.js';
import categoryRoute from './routes/categoriesRoute.js';
import authorsRoute from './routes/authorRoutes.js';
import booksRoute from './routes/bookRoutes.js';
import fileUploadMiddleware from './utils/handleFIleUpload.js';

const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/',router);
app.use('/users' , userRoute);
app.use('/categories',categoryRoute);
app.use('/authors' , authorsRoute);
app.use('/books',booksRoute);



export default app;