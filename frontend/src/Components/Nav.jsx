import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BuildNav = () => {
    const { t } = useTranslation();

    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      dispatch(logout());
      navigate('/');
    };
  

return ( 
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
            {isAuthenticated && <button type="button" onClick={handleLogout} className="btn btn-primary">{t('logOutButton')}
</button>}
        </div>

    </nav>
    )
}

export const Nav = () => BuildNav();