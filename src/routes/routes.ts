import IndexPage from '../modules/index/IndexContainer';
import ContentPage from '../modules/content/ContentView';
import MemberPage from '../modules/members/MemberContainer';
import LoginPage from '../modules/login/LoginContainer';
import RegisterPage from '../modules/register/RegisterContainer';
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
    path: '/register',
    exact: true,
    component: RegisterPage,
  },
  {
    path: '/landingAuth',
    exact: true,
    component: LandingAuthPage,
    secure: true,
  },
];

export default routeList;
