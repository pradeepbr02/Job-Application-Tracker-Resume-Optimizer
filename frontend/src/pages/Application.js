import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import {getApplications 
    ,createApplication 
    ,deleteApplication
    ,updateJobApplicationStatus 
    ,resumeAnalyze
 } from "../apis/applicationApi.js";   
import ApplicationNotes from "../components/ApplicationNotes.js";
import ResultAnalysis from "../components/ResultAnalysis.js";
import '../styles/application.css'


const Application = ()=>{
    const [applications , setApplications] = useState([])
    const [company , setCompany] = useState('')
    const [role , setRole] = useState('')
    const [status , setStatus] = useState('Applied')
    const [jobdescription , setJobdescription] = useState('')
    const [loading , setLoading] = useState(false)
    const [visibleAnalysis, setVisibleAnalysis] = useState({})//{ appId1: true,appId2: false}

    const navigate = useNavigate()

    useEffect(()=>{
         fetchApplications()
    } , [])

    const fetchApplications = async ()=>{
        setLoading(true)
        const data = await getApplications()
        setApplications(data)
        setLoading(false)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await createApplication({company , role , jobdescription})
        setCompany('')
        setRole('')
        setJobdescription('')
        fetchApplications()

    }
    const handleDelete = async(id)=>{
        await deleteApplication(id)
        fetchApplications()
    }

    const handleUpdateStatus = async(id , status)=>{
        await updateJobApplicationStatus(id , status)
        fetchApplications()
    }

    const handleResumeAnalyze = async(applicationId)=>{
        setLoading(true)
        const resp = await resumeAnalyze(applicationId)
        setApplications((prev)=>
            prev.map((app)=>(
                app._id===applicationId ? {...app , aiScore : resp.score , aiAnalysis : resp.analysis}:app
            ))
        )
        setLoading(false)
        
    }
    const handleAnalysisShowbtn = (appId)=>{
        setVisibleAnalysis((prev)=>({
            ...prev ,
            [appId] : !prev[appId]
        }))
    }

    return (
        <div className="applications-page">
  <h2>Job Applications</h2>

  <form className="application-form" onSubmit={handleSubmit}>
    <input
      placeholder="Company"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
    />
    <input
      placeholder="Role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    />
    <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option>Applied</option>
      <option>Interview</option>
      <option>Offer</option>
      <option>Rejected</option>
    </select>
    <textarea
      placeholder="Job description"
      value={jobdescription}
      onChange={(e) => setJobdescription(e.target.value)}
    />
    <button>Add</button>
  </form>

  {loading ? (
    <p>Loading Applications...</p>
  ) : (
    <ul className="applications-list">
      {applications.map((app) => (
        <li key={app._id} className="application-card">
          <div className="application-header">
            <div>
              <div className="company-name">{app.company}</div>
              <div className="role-name">{app.role}</div>
            </div>

            <select className="application-status"
              value={app.status}
              onChange={(e) =>
                handleUpdateStatus(app._id, e.target.value)
              }
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <button onClick={() => handleDelete(app._id)}>Delete</button>
          </div>

          <div className="application-actions">
            
            <button onClick={() => handleResumeAnalyze(app._id)}>
              Analyze Resume
            </button>
            <button onClick={() => handleAnalysisShowbtn(app._id)}>
              {visibleAnalysis[app._id]
                ? 'Hide Analysis'
                : 'Show Analysis'}
            </button>
          </div>

          <ApplicationNotes appId={app._id} />

          {visibleAnalysis[app._id] && (
            <ResultAnalysis
              score={app.aiScore}
              analysis={app.aiAnalysis}
            />
          )}
        </li>
      ))}
    </ul>
  )}
  <div className="btn-cls">
  
        <button onClick={()=>navigate('/analytics')}>
            See Analytics
        </button>
         <button onClick={()=>navigate('/dashboard')}>
            Go to Dashboard
        </button>
  </div>
  
</div>

    )

 }

 export default Application