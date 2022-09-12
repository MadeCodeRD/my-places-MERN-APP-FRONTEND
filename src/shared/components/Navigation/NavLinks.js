import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);
  
  return (
    <ul className='nav-links'>

      <li><NavLink to='/' exact>All USERS</NavLink></li>

      {authCtx.isLogged && <li><NavLink to={`/${authCtx.userId}/places`}>MY PLACES</NavLink></li>}

     {authCtx.isLogged &&  <li><NavLink to='/places/new'>NEW PLACE</NavLink></li>}

      {!authCtx.isLogged && <li><NavLink to='/auth'>AUTHENTICATE</NavLink></li>}

      {authCtx.isLogged && <button onClick={authCtx.logout}>LOGOUT</button>}

    </ul>
  );
};

export default NavLinks;
