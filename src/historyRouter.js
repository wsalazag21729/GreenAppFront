import {browserHistory as browserHistoryDev, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
const browserHistoryProd = useRouterHistory(createHistory)({
    basename: '/'
});
const router = process.env.NODE_ENV === 'production' ? browserHistoryProd : browserHistoryDev;

export default router;
