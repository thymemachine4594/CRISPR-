import { useNavigate } from "react-router-dom"
import QuestionContainer from "../components/QuestionContainer"
import { diagnosisFlow } from "../data/diagnosisQuestions"
import { useDiagnosis } from "../context/DiagnosisContext"

export default function DiagnosisStep2() {
  const navigate = useNavigate()
  const { addAnswers } = useDiagnosis()

  const handleNext = (answers) => {
    addAnswers(answers)
    navigate("/diagnosis/3")
  }

  return (
    <QuestionContainer
      questions={diagnosisFlow.step2}
      onNext={handleNext}
    />
  )
}