import type { Category, Level } from '../types';
import { getItemById } from '../gameData';
import MenuItemCard from './MenuItemCard';
import OrderTray from './OrderTray';

const categories: Category[] = ['Drinks', 'Pastries', 'Fruit / Snacks'];

type CafeCounterProps = {
  level: Level;
  choiceIds: string[];
  selectedItemIds: string[];
  canSubmit: boolean;
  onAddItem: (itemId: string) => void;
  onClear: () => void;
  onRemoveLast: () => void;
  onSubmit: () => void;
};

function CafeCounter({
  level,
  choiceIds,
  selectedItemIds,
  canSubmit,
  onAddItem,
  onClear,
  onRemoveLast,
  onSubmit
}: CafeCounterProps) {
  return (
    <section className="counter-zone">
      <div className="wood-counter">
        <div className="counter-grain" />
        <div className="tray-panel">
          <div className="tray-heading">
            <span>Serving Tray</span>
            <small>{selectedItemIds.length}/{level.order.length} placed</small>
          </div>
          <OrderTray orderLength={level.order.length} selectedItemIds={selectedItemIds} />
          <div className="tray-actions">
            <button type="button" onClick={onRemoveLast} disabled={selectedItemIds.length === 0}>
              Undo
            </button>
            <button type="button" onClick={onClear} disabled={selectedItemIds.length === 0}>
              Clear
            </button>
            <button className="primary-button" type="button" onClick={onSubmit} disabled={!canSubmit}>
              Submit Order
            </button>
          </div>
        </div>
        <div className="counter-props">
          <div className="register" aria-hidden="true">
            <div className="register-screen">Menu</div>
            <div className="register-body">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="chalkboard" aria-hidden="true">
            <strong>Today</strong>
            <span>Fresh bakes</span>
            <span>House drinks</span>
          </div>
        </div>
      </div>

      <MenuShelves choiceIds={choiceIds} level={level} onAddItem={onAddItem} />
    </section>
  );
}

function MenuShelves({
  choiceIds,
  level,
  onAddItem
}: {
  choiceIds: string[];
  level: Level;
  onAddItem: (itemId: string) => void;
}) {
  if (!level.chunkingEnabled) {
    return (
      <div className="menu-board single-menu-board">
        <h3>Café Items</h3>
        <div className="menu-card-grid">
          {choiceIds.map((itemId) => (
            <MenuItemCard key={itemId} itemId={itemId} onClick={() => onAddItem(itemId)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="menu-board chunked-menu-board">
      <p className="chunking-sign">Chunking strategy unlocked: group items into meaningful categories.</p>
      {categories.map((category) => {
        const categoryChoiceIds = choiceIds.filter((itemId) => getItemById(itemId).category === category);

        return (
          <section className="menu-shelf" key={category}>
            <h3>{category === 'Fruit / Snacks' ? 'Fruit & Snacks Shelf' : `${category} Shelf`}</h3>
            <div className="menu-card-grid">
              {categoryChoiceIds.map((itemId) => (
                <MenuItemCard key={itemId} itemId={itemId} onClick={() => onAddItem(itemId)} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default CafeCounter;
