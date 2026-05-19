import { getItemById } from '../gameData';

type MenuItemCardProps = {
  itemId: string;
  onClick: () => void;
};

function MenuItemCard({ itemId, onClick }: MenuItemCardProps) {
  const item = getItemById(itemId);

  return (
    <button className="menu-item-card" type="button" onClick={onClick}>
      <span className="menu-item-emoji" aria-hidden="true">{item.emoji}</span>
      <span className="menu-item-name">{item.name}</span>
      <span className="menu-item-line" />
    </button>
  );
}

export default MenuItemCard;
