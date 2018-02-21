import IndexPage from '../modules/index/IndexContainer';
import ContentPage from '../modules/content/ContentView';

const routeList: Array<object> = [
  {
    path: '/',
    exact: true,
    component: IndexPage, // Add your route here
  },
  {
    path: '/content',
    exact: true,
    component: ContentPage, // Add your route here
  },
];

export default routeList;
