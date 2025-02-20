import { useProgress } from "@react-three/drei";

export const LoadingScreen = ({ started, onStarted }) => {
    const { progress } = useProgress();
  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
      <div className="loadingScreen__progress">
        <div
          className="loadingScreen__progress__value"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div className="loadingScreen__board">
        <h1 className="loadingScreen__title">Vårkänslor</h1>
        <div className="loadingScreen__paragraph">
          <p>Double-click to see</p>
          <p>Worlds unfold in poetry</p>
          <p>Haiku's silent voice</p>
          <p className="mobile">[Mobile - use landscape & double tap ]</p>
        </div>
        <div>
        </div>
        <button
          className="loadingScreen__button"
          disabled={progress < 100}
          onClick={onStarted}
        >
          Spring is here
        </button>
      </div>
    </div>
  );
};
