import { createContext, useContext, useState } from "react"

const DiagnosisContext = createContext()

export function DiagnosisProvider({ children }) {
  const [answers, setAnswers] = useState({})
  const [diagnosisResult, setDiagnosisResult] = useState(null)

  // Merge answers from a step into the shared answers object
  const addAnswers = (stepAnswers) => {
    setAnswers((prev) => ({ ...prev, ...stepAnswers }))
  }

  // Clear everything for a fresh assessment
  const resetAnswers = () => {
    setAnswers({})
    setDiagnosisResult(null)
  }

  return (
    <DiagnosisContext.Provider
      value={{ answers, addAnswers, resetAnswers, diagnosisResult, setDiagnosisResult }}
    >
      {children}
    </DiagnosisContext.Provider>
  )
}

export const useDiagnosis = () => useContext(DiagnosisContext)
