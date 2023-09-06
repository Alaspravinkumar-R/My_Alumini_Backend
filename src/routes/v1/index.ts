import express from 'express';

import loginRoute from "./login.route";
import studentRoute from "./student.route";

const router = express.Router();

const defaultRoutes = [

    {
        path: '/auth',
        route: loginRoute,
    },
    {
        path: '/student',
        route: studentRoute,
    },

];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


export default router;