import ItemBadge from './ItemBadge';

type OrderTrayProps = {
  orderLength: number;
  selectedItemIds: string[];
};

function OrderTray({ orderLength, selectedItemIds }: OrderTrayProps) {
  return (
    <div className="order-tray" aria-label="Serving tray with numbered order slots">
      {Array.from({ length: orderLength }).map((_, index) => {
        const itemId = selectedItemIds[index];

        return (
          <div className={itemId ? 'tray-slot filled' : 'tray-slot'} key={index}>
            <span className="slot-number">{index + 1}</span>
            {itemId ? <ItemBadge itemId={itemId} compact /> : <span className="empty-slot-mark" />}
          </div>
        );
      })}
    </div>
  );
}

export default OrderTray;
