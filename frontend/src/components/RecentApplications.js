import { useEffect, useState } from "react"
import { getApplications } from "../apis/applicationApi.js"
import '../styles/recentApplication.css'

const RecentApplication = () => {
  const [recentApps, setRecentApps] = useState([])

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    const data = await getApplications()
    const sorted = [...data]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)

    setRecentApps(sorted)
  }

  return (
    <div className="recent-card">
      <h3>Recent Applications</h3>

      <ul className="recent-list">
        {recentApps.map((app) => (
          <li key={app._id} className="recent-item">
            <div>
              <span className="company">{app.company}</span>
              <span className="role"> — {app.role}</span>
            </div>

            <span className={`status ${app.status.toLowerCase()}`}>
              {app.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentApplication
