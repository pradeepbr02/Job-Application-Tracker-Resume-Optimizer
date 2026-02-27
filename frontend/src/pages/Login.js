import { useEffect, useState } from "react";
import { loginUser } from "../apis/auth.api.js";
import { useNavigate } from "react-router-dom";
import '../styles/auth.css'
const Login = ()=>{
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
           navigate('/dashboard')
        }
    } , [navigate])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        setError('')
       

        try{
            const data = await loginUser({email , password})
            localStorage.setItem('token' , data.token)
            navigate('/dashboard')
        }
        catch(error){
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div className="auth-container" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                 {error && <p style={{ color: 'red' }}>{error}</p>}

                <button disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default Login