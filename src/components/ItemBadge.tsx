import { getItemById } from '../gameData';

type ItemBadgeProps = {
  itemId: string;
  compact?: boolean;
};

function ItemBadge({ itemId, compact = false }: ItemBadgeProps) {
  const item = getItemById(itemId);

  return (
    <span className={compact ? 'item-badge compact' : 'item-badge'}>
      <span aria-hidden="true">{item.emoji}</span>
      <span>{item.name}</span>
    </span>
  );
}

export default ItemBadge;
