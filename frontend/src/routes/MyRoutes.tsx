import { useRoutes } from 'react-router-dom';
import HomePage from '../components/LoginPage';

import { ShowRequestPage } from '../components/ShowRequestPage';
import ProtectedRouter from './ProtectedRouter';
import ShowLeaveDate from '../components/ShowLeaveDate';
import Header from '../components/HomePage/Header';
import RequestLeave from '../components/RequestLeave';
// import Profile from '../components/Profile';
import AddUser from '../components/Admin/AddUser';
import UpdateUser from '../components/Admin/UpdateUser';
import ShowLeaveDetails from '../components/ShowLeaveDetails';
import Todos from '../components/Todos';
import Todostatus from '../components/Todostatus';
import Todosforstaff from '../components/Todosforstaff';
import Profile from '../components/Profile';
import { jwtDecode } from 'jwt-decode';
import RestrictionRouter from './RestrictionRouter';

const MyRoutes = () => {
  let hasToken = localStorage.getItem('accessToken');
  let user: {role:String} = hasToken ? jwtDecode(hasToken) : {role: ''};
  let element = useRoutes([
    {
      path: '/',
      element: (
        <ProtectedRouter></ProtectedRouter>
      ),
      children: [
        {
          path: 'messages',
          element: <HomePage />
        }
      ]
    },  
    {
      path: '/show request',
      element: (
        user.role === "hod" || user.role === "principal" ? <ShowRequestPage></ShowRequestPage>:<RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Leave Request',
      element: (
        user.role==="staff" || user.role!=="hod" ? <RequestLeave></RequestLeave> :<RestrictionRouter></RestrictionRouter>
      ),
    },  
    {
      path: '/Add User',
      element: (
        user.role==="admin" ? <AddUser></AddUser>:<RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Leave Details',
      element: (
          user.role!=="principal" ? <ShowLeaveDetails></ShowLeaveDetails> : <RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Todos',
      element: (
        user.role === "hod" ?<Todos></Todos> : <RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Todos Status',
      element: (
        user.role === "hod" ? <Todostatus></Todostatus> : <RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Task',
      element: (
        user.role === "staff" ? <Todosforstaff></Todosforstaff> : <RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Profile',
      element: (
          <Profile/>
      ),
    }, 
  ]);
  return element;
};

export default MyRoutes;