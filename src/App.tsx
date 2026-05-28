import { useEffect, useState } from 'react';
import CafeScene from './components/CafeScene';
import { levels } from './gameData';
import type { GamePhase, Level, PlayerAnswer, RoundLevel } from './types';
import { sampleItems, shuffleArray } from './utils/shuffle';

type RoundData = {
  order: string[];
  choices: string[];
};

const uniqueItemIds = (itemIds: string[]) => [...new Set(itemIds)];

function generateRoundData(level: Level): RoundData {
  if (level.orderLength > level.availableItemIds.length) {
    throw new Error(`Level ${level.id} needs ${level.orderLength} items, but only has ${level.availableItemIds.length}.`);
  }

  const order = sampleItems(level.availableItemIds, level.orderLength);
  const unusedAvailableItems = level.availableItemIds.filter((itemId) => !order.includes(itemId));
  const distractors = uniqueItemIds([...level.distractorItemIds, ...unusedAvailableItems]).filter(
    (itemId) => !order.includes(itemId)
  );
  const choices = shuffleArray(uniqueItemIds([...order, ...distractors]));

  return { order, choices };
}

function App() {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [levelIndex, setLevelIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(levels[0].studySeconds);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [roundData, setRoundData] = useState<RoundData>(() => generateRoundData(levels[0]));
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [lastAnswer, setLastAnswer] = useState<PlayerAnswer | null>(null);
  const [showPsychCheck, setShowPsychCheck] = useState(false);

  const level = levels[levelIndex];
  const currentLevel: RoundLevel = {
    ...level,
    order: roundData.order,
    choices: roundData.choices
  };
  const totalPossible = answers.reduce((sum, answer) => sum + levels[answer.levelId - 1].orderLength, 0);
  const totalCorrect = answers.reduce((sum, answer) => sum + answer.correctByPosition, 0);
  const currentAccuracy = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;

  useEffect(() => {
    if (phase !== 'study') {
      return;
    }

    setTimeLeft(level.studySeconds);
    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setPhase('build');
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [phase, level.studySeconds]);

  const startLevel = (nextLevelIndex: number) => {
    setLevelIndex(nextLevelIndex);
    setRoundData(generateRoundData(levels[nextLevelIndex]));
    setSelectedItemIds([]);
    setLastAnswer(null);
    setPhase('study');
  };

  const startGame = () => {
    setAnswers([]);
    startLevel(0);
  };

  const addItem = (itemId: string) => {
    if (phase !== 'build' || selectedItemIds.length >= roundData.order.length) {
      return;
    }

    setSelectedItemIds((current) => [...current, itemId]);
  };

  const removeLastItem = () => {
    setSelectedItemIds((current) => current.slice(0, -1));
  };

  const clearSelection = () => {
    setSelectedItemIds([]);
  };

  const submitAnswer = () => {
    const correctByPosition = roundData.order.reduce((score, itemId, index) => {
      return score + (selectedItemIds[index] === itemId ? 1 : 0);
    }, 0);

    const missedItems = roundData.order.filter((itemId, index) => selectedItemIds[index] !== itemId);
    const incorrectItems = selectedItemIds.filter((itemId, index) => roundData.order[index] !== itemId);
    const answer: PlayerAnswer = {
      levelId: level.id,
      selectedItemIds,
      correctByPosition,
      missedItems,
      incorrectItems
    };

    setAnswers((current) => [...current, answer]);
    setLastAnswer(answer);
    setPhase('feedback');
  };

  const nextLevel = () => {
    if (levelIndex === levels.length - 1) {
      setPhase('end');
      return;
    }

    startLevel(levelIndex + 1);
  };

  const finalPossible = levels.reduce((sum, currentLevel) => sum + currentLevel.orderLength, 0);
  const finalCorrect = answers.reduce((sum, answer) => sum + answer.correctByPosition, 0);
  const finalAccuracy = finalPossible > 0 ? Math.round((finalCorrect / finalPossible) * 100) : 0;

  return (
    <main className="app-shell">
      <section className="game-panel">
        <header className="top-bar">
          <div>
            <h1>Memory Café</h1>
          </div>
          <div className="header-actions">
            <div className="score-card">
              <span>Total Score</span>
              <strong>{totalCorrect}/{totalPossible || 0}</strong>
              <small>{currentAccuracy}% accuracy</small>
            </div>
            <button className="ghost-button" type="button" onClick={() => setShowPsychCheck(true)}>
              Psychology Check
            </button>
          </div>
        </header>

        {phase === 'start' && (
          <section className="start-screen">
            <div className="start-cafe-preview" aria-hidden="true">
              <div className="awning" />
              <div className="preview-window">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-counter" />
            </div>
            <h2>Can you keep the orders straight?</h2>
            <p>
              Customers flash their orders for a few seconds. When the order disappears, rebuild it in the exact
              sequence by clicking café items. Longer orders and distractors will push your working memory.
            </p>
            <button className="primary-button" type="button" onClick={startGame}>
              Start Shift
            </button>
          </section>
        )}

        {phase !== 'start' && phase !== 'end' && (
          <section className="level-screen">
            <div className="level-header">
              <div>
                <p className="eyebrow">Level {level.id} of {levels.length}</p>
                <h2>{level.title}</h2>
              </div>
            </div>

            <CafeScene
              answer={lastAnswer}
              canSubmit={selectedItemIds.length === roundData.order.length}
              choiceIds={roundData.choices}
              level={currentLevel}
              levelIndex={levelIndex}
              isFinalLevel={levelIndex === levels.length - 1}
              phase={phase}
              selectedItemIds={selectedItemIds}
              timeLeft={timeLeft}
              onAddItem={addItem}
              onClear={clearSelection}
              onNext={nextLevel}
              onRemoveLast={removeLastItem}
              onSubmit={submitAnswer}
            />
          </section>
        )}

        {phase === 'end' && (
          <section className="end-screen">
            <p className="eyebrow">Shift Complete</p>
            <h2>Final Score: {finalCorrect}/{finalPossible}</h2>
            <div className="accuracy-meter">
              <div style={{ width: `${finalAccuracy}%` }} />
            </div>
            <p className="final-accuracy">{finalAccuracy}% sequence accuracy</p>
            <div className="debrief-grid">
              <DebriefCard
                title="Working Memory"
                text="The disappearing orders represented working memory: the limited mental workspace where you briefly hold information while using it."
              />
              <DebriefCard
                title="Cognitive Load"
                text="Longer orders, similar drink names, and extra choices increased cognitive load, making it harder to keep every item in the right order."
              />
              <DebriefCard
                title="Chunking"
                text="Grouped categories helped you organize separate items into meaningful units, which can make information easier to remember."
              />
            </div>
            <button className="primary-button" type="button" onClick={startGame}>
              Play Again
            </button>
          </section>
        )}
      </section>

      {showPsychCheck && <PsychologyCheck onClose={() => setShowPsychCheck(false)} />}
    </main>
  );
}

function DebriefCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="debrief-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function PsychologyCheck({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="psych-check-title">
      <section className="modal">
        <button className="close-button" type="button" onClick={onClose} aria-label="Close psychology check">
          ×
        </button>
        <h2 id="psych-check-title">Psychology Check</h2>
        <ul>
          <li>Disappearing orders make players rely on short-term working memory.</li>
          <li>Increasing order length demonstrates limited capacity and higher cognitive load.</li>
          <li>Distractor buttons test interference from similar information.</li>
          <li>Chunking mode groups items into meaningful categories to support recall.</li>
          <li>The final debrief connects the mechanics to AP Psychology vocabulary.</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
