import { useNavigate } from "react-router-dom"
import { CircularResult, CrisprRecommendation } from "../components/CircularResult"
import DNAHelix from "../components/DNAHelix"
import { useDiagnosis } from "../context/DiagnosisContext"

// Chart colours for each disease
const DISEASE_COLOURS = {
  "Sickle Cell Anemia": "#ef4444",
  "Beta Thalassemia": "#3b82f6",
  "ATTR": "#f59e0b",
  "LCA": "#a78bfa",
}

export default function Result() {
  const navigate = useNavigate()
  const { diagnosisResult } = useDiagnosis()

  // Guard: if user navigated here directly without completing the questionnaire
  if (!diagnosisResult) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        <p style={{ color: "#fff", fontSize: "20px" }}>No assessment data found.</p>
        <button className="glow-btn" onClick={() => navigate("/diagnosis/1")}>
          Start Assessment
        </button>
      </div>
    )
  }

  const { topDisease, percentages } = diagnosisResult

  // Build array for CircularResult chart (all four diseases with live percentages)
  const chartData = Object.entries(percentages).map(([name, value]) => ({
    name,
    value,
    color: DISEASE_COLOURS[name] ?? "#6b7280",
  }))

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "200%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "30px",
      }}
    >
      {/* DNA background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.55,
          pointerEvents: "none",
        }}
      >
        <DNAHelix />
      </div>

      {/* Result card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1100px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "12px",
            fontSize: "28px",
          }}
        >
          Genetic Diagnosis &amp; CRISPR Recommendation
        </h2>

        {/* Suspicion label */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          {topDisease ? (
            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: DISEASE_COLOURS[topDisease] ?? "#fff",
                background: "rgba(255,255,255,0.06)",
                display: "inline-block",
                padding: "10px 24px",
                borderRadius: "12px",
                border: `1px solid ${DISEASE_COLOURS[topDisease] ?? "#fff"}44`,
              }}
            >
              In suspicion of{" "}
              <span style={{ textDecoration: "underline" }}>{topDisease}</span>
            </p>
          ) : (
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#94a3b8",
                background: "rgba(255,255,255,0.06)",
                display: "inline-block",
                padding: "10px 24px",
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.3)",
              }}
            >
              We recommend seeing a doctor
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: "900px",
            margin: "0 auto",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {/* LEFT — disease probability chart */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: "24px",
              borderRadius: "20px",
            }}
          >
            <h3 style={{ color: "#fff", marginBottom: "16px" }}>
              Symptom Match Scores
            </h3>
            <CircularResult data={chartData} />
          </div>

          {/* RIGHT — CRISPR recommendation (placeholder until next task) */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: "24px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CrisprRecommendation percentage={topDisease ? 78 : 0} />
          </div>
        </div>

        {/* Restart button */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <button
            className="glow-btn"
            onClick={() => navigate("/diagnosis/1")}
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  )
}

