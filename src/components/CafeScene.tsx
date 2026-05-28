import type { GamePhase, PlayerAnswer, RoundLevel } from '../types';
import Barista from './Barista';
import CafeCounter from './CafeCounter';
import CustomerQueue from './CustomerQueue';
import FeedbackReceipt from './FeedbackReceipt';
import OrderSequence from './OrderSequence';

type CafeSceneProps = {
  answer: PlayerAnswer | null;
  canSubmit: boolean;
  choiceIds: string[];
  isFinalLevel: boolean;
  level: RoundLevel;
  levelIndex: number;
  phase: GamePhase;
  selectedItemIds: string[];
  timeLeft: number;
  onAddItem: (itemId: string) => void;
  onClear: () => void;
  onNext: () => void;
  onRemoveLast: () => void;
  onSubmit: () => void;
};

function CafeScene({
  answer,
  canSubmit,
  choiceIds,
  isFinalLevel,
  level,
  levelIndex,
  phase,
  selectedItemIds,
  timeLeft,
  onAddItem,
  onClear,
  onNext,
  onRemoveLast,
  onSubmit
}: CafeSceneProps) {
  return (
    <div className={`cafe-scene phase-${phase}`}>
      <div className="cafe-wall">
        <div className="wall-shelf">
          <span />
          <span />
          <span />
        </div>
        <div className="round-clock" aria-label={`${timeLeft} seconds remaining`}>
          <strong>{phase === 'study' ? timeLeft : '—'}</strong>
          <span>{phase === 'study' ? 'sec' : 'hide'}</span>
        </div>
      </div>

      <div className="scene-floor">
        <CustomerQueue levelIndex={levelIndex} />
        <Barista />

        {phase === 'study' && (
          <div className="order-bubble" key={`order-${level.id}`}>
            <p>Can I get...</p>
            <OrderSequence itemIds={level.order} />
          </div>
        )}

        {phase !== 'study' && (
          <div className="hidden-ticket" key={`hidden-${level.id}`}>
            <span>Order hidden</span>
          </div>
        )}
      </div>

      {phase === 'feedback' && answer && (
        <FeedbackReceipt
          answer={answer}
          isFinalLevel={isFinalLevel}
          onNext={onNext}
          orderLength={level.order.length}
        />
      )}

      <CafeCounter
        canSubmit={canSubmit}
        choiceIds={choiceIds}
        level={level}
        onAddItem={onAddItem}
        onClear={onClear}
        onRemoveLast={onRemoveLast}
        onSubmit={onSubmit}
        selectedItemIds={selectedItemIds}
      />
    </div>
  );
}

export default CafeScene;
