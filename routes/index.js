import { monitorDevActions, route404 } from '../middlewares';
import apiRoutes from './apis';

export const routes = app => {
  app.use(monitorDevActions);
  app.use('/api', apiRoutes);
  app.all('*', route404);
};
