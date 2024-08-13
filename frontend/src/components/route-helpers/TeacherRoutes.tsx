import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const TeacherRoutes = () => {
    const auth = useAuth()
    
    return (
      auth.user.isTeacher ? <Outlet/> : <Navigate to='/dashboard'/>
    )
  }

  export default TeacherRoutes