import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingPage from '../shared/LoadingPage'


const PrivateRoutes = () => {
    const auth = useAuth()
    console.log("private",auth.isLoggedIn)

    if (auth.isLoading) {
      return <LoadingPage />
    }
    
    return (
      auth.isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
    )
  }

  export default PrivateRoutes