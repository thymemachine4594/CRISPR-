import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import QuestionContainer from "../components/QuestionContainer"
import { diagnosisFlow } from "../data/diagnosisQuestions"
import { useDiagnosis } from "../context/DiagnosisContext"

export default function DiagnosisStep1() {
  const navigate = useNavigate()
  const { addAnswers, resetAnswers } = useDiagnosis()

  // Clear any previous session when the user starts fresh
  useEffect(() => {
    resetAnswers()
  }, [])

  const handleNext = (answers) => {
    addAnswers(answers)
    navigate("/diagnosis/2")
  }

  return (
    <QuestionContainer
      questions={diagnosisFlow.step1}
      onNext={handleNext}
    />
  )
}