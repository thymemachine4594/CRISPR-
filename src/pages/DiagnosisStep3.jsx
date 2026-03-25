import { useNavigate } from "react-router-dom"
import QuestionContainer from "../components/QuestionContainer"
import { diagnosisFlow } from "../data/diagnosisQuestions"
import { useDiagnosis } from "../context/DiagnosisContext"
import { computeDiagnosis } from "../utils/scoreEngine"

export default function DiagnosisStep3() {
  const navigate = useNavigate()
  const { answers, addAnswers, setDiagnosisResult } = useDiagnosis()

  const handleNext = (stepAnswers) => {
    // Merge step 3 answers with all previous answers
    const allAnswers = { ...answers, ...stepAnswers }
    addAnswers(stepAnswers)

    // Run the scoring engine on the complete answer set
    const result = computeDiagnosis(allAnswers)
    setDiagnosisResult(result)

    navigate("/result")
  }

  return (
    <QuestionContainer
      questions={diagnosisFlow.step3}
      onNext={handleNext}
    />
  )
}