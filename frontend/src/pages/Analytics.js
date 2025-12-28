import { useEffect, useState } from 'react'
import { fetchDashboardAnalytics } from '../apis/analyticsApi.js'
import '../styles/analysis.css'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FF8042', '#FF6384']

function Analytics() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function loadAnalytics() {
      const res = await fetchDashboardAnalytics()
      setData(res)
    }
    loadAnalytics()
  }, [])

  if (!data) return <p>Loading analytics...</p>
  const statusData = Object.entries(data.statusBreakdown).map(
        ([status, count]) => ({
            _id: status,
            count,
        })
        )

  return (
    <div className='analysis-box' style={{ padding: '20px' }}>
      <h2>Dashboard Analytics</h2>

      <div style={{ display: 'flex', gap: '30px' }}>
        <h4>Total Applications: {data.totalApplications}</h4>
        <h4>Average AI Score: {data.averageAiScore ?? 'N/A'}%</h4>
      </div>

  
       
    
      <h3>Status Breakdown</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={statusData}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {statusData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>


      <h3>Applications Over Time</h3>
      <LineChart width={600} height={300} data={data.monthlyApplications}>
        <XAxis
          dataKey="_id"
          tickFormatter={(v) => `${v.month}/${v.year}`}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(v) => `${v.month}/${v.year}`}
        />
        <Line type="monotone" dataKey="count" />
      </LineChart>

     
      <h3>Top Missing Skills</h3>
      <BarChart width={600} height={300} data={data.topMissingSkills}>
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>
    </div>
  )
}

export default Analytics
