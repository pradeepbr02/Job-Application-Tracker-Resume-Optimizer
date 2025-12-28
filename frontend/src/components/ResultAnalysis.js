import '../styles/resultAnalysis.css'
const ResultAnalysis = ({ score, analysis }) => {
  if (!analysis) return null

  return (
    <div className="analysis-card">
      <h4 className="analysis-score">
        AI Match Score: <span>{score}</span>
      </h4>

      <div className="analysis-section success">
        <strong>Strengths</strong>
        <p>{analysis.strengths.join(', ')}</p>
      </div>

      <div className="analysis-section warning">
        <strong>Missing Skills</strong>
        <p>{analysis.missingSkills.join(', ')}</p>
      </div>

      <div className="analysis-section info">
        <strong>Suggestions</strong>
        <p>{analysis.suggestions.join(', ')}</p>
      </div>
    </div>
  )
}

export default ResultAnalysis
