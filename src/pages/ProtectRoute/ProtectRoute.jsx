
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.config';
import LoadingComponents from '../../Components/LoadingComponents';
// import { auth } from '../../Firebase.init';

const ProtectRoute = ({children}) => {
            const [user, loading] = useAuthState(auth);
            const location = useLocation();
            if(loading){
                return <LoadingComponents/>
            }
            if(!user){
                return <Navigate to="/log-in" state={{ from: location }} replace />;
            }
            return children;
};

export default ProtectRoute;