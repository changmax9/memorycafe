import ItemBadge from './ItemBadge';

type OrderSequenceProps = {
  itemIds: string[];
};

function OrderSequence({ itemIds }: OrderSequenceProps) {
  return (
    <div className="order-sequence">
      {itemIds.map((itemId, index) => (
        <ItemBadge key={`${itemId}-${index}`} itemId={itemId} />
      ))}
    </div>
  );
}

export default OrderSequence;
