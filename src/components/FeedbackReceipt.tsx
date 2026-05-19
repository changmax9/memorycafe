import type { PlayerAnswer } from '../types';
import OrderSequence from './OrderSequence';

type FeedbackReceiptProps = {
  answer: PlayerAnswer;
  orderLength: number;
  isFinalLevel: boolean;
  onNext: () => void;
};

function FeedbackReceipt({ answer, orderLength, isFinalLevel, onNext }: FeedbackReceiptProps) {
  return (
    <div className="feedback-receipt" role="status">
      <div className="receipt-top" />
      <h3>Order Receipt</h3>
      <p className="feedback-score">
        {answer.correctByPosition} of {orderLength} items matched the exact sequence.
      </p>
      <div className="receipt-lines">
        <section>
          <div className="receipt-label">✓ You entered</div>
          {answer.selectedItemIds.length > 0 ? <OrderSequence itemIds={answer.selectedItemIds} /> : <p>Nothing</p>}
        </section>
        <section>
          <div className="receipt-label">Needs review</div>
          {answer.missedItems.length > 0 ? <OrderSequence itemIds={answer.missedItems} /> : <p>None missed</p>}
        </section>
        <section>
          <div className="receipt-label">Incorrect picks</div>
          {answer.incorrectItems.length > 0 ? <OrderSequence itemIds={answer.incorrectItems} /> : <p>None</p>}
        </section>
      </div>
      <button className="primary-button" type="button" onClick={onNext}>
        {isFinalLevel ? 'See Debrief' : 'Next Customer'}
      </button>
    </div>
  );
}

export default FeedbackReceipt;
