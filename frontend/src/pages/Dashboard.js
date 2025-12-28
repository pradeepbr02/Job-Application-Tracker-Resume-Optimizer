import { useNavigate } from "react-router-dom"
import RecentApplication from "../components/RecentApplications.js"
import '../styles/dashboard.css'
const Dashboard = ()=>{
    const navigate = useNavigate()
    const handleLogout = ()=>{
        
        localStorage.removeItem('token')
        navigate('/login')

    }

    return (
        <div className="page-container">
            <div className="card">
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        <RecentApplication/>
        <div className="btn-cls">
         <button onClick={()=>navigate('/application')}>
            Go to Applications
        </button>
        <button onClick={()=>navigate('/resume')}>
            Upload Latest Resume
        </button>
        <button onClick={()=>navigate('/analytics')}>
            See Analytics
        </button>
        </div>
       
        </div>
        </div>
    )
}

export default Dashboard