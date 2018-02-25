import IndexPage from '../modules/index/IndexContainer';
import ContentPage from '../modules/content/ContentView';
import MemberPage from '../modules/members/MemberContainer';
import LoginPage from '../modules/login/LoginContainer';
import LandingAuthPage from '../modules/LandingAuth/LandingAuthContainer';

const routeList: Array<object> = [
  {
    path: '/',
    exact: true,
    component: IndexPage, // Add your route here
  },
  {
    path: '/content',
    exact: true,
    component: ContentPage,
  },
  {
    path: '/members',
    exact: true,
    component: MemberPage,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/landingAuth',
    exact: true,
    component: LandingAuthPage,
  },
];

export default routeList;
