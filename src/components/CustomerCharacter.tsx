type CustomerCharacterProps = {
  variant: number;
  active?: boolean;
  label: string;
};

const characterLooks = [
  { hair: 'bob', hairColor: '#3d2418', shirt: '#6f8f78', pants: '#3c4f58', skin: '#c8855f' },
  { hair: 'short', hairColor: '#1f1713', shirt: '#b76f45', pants: '#2f4154', skin: '#d59a73' },
  { hair: 'curly', hairColor: '#60412f', shirt: '#6b7fb2', pants: '#574134', skin: '#9f6648' },
  { hair: 'bun', hairColor: '#7b4d2d', shirt: '#a95d69', pants: '#2d5041', skin: '#e0ad86' },
  { hair: 'cap', hairColor: '#2f6d58', shirt: '#d4a24f', pants: '#3f342b', skin: '#b97956' },
  { hair: 'waves', hairColor: '#523629', shirt: '#5f9c9b', pants: '#50413a', skin: '#c99272' }
];

function CustomerCharacter({ variant, active = false, label }: CustomerCharacterProps) {
  const look = characterLooks[variant % characterLooks.length];

  return (
    <div className={active ? 'customer-character active' : 'customer-character'} aria-label={label}>
      <div className="customer-shadow" />
      <div className="customer-body">
        <div className="legs">
          <span style={{ backgroundColor: look.pants }} />
          <span style={{ backgroundColor: look.pants }} />
        </div>
        <div className="torso" style={{ backgroundColor: look.shirt }}>
          <span className="arm left" style={{ backgroundColor: look.skin }} />
          <span className="arm right" style={{ backgroundColor: look.skin }} />
        </div>
        <div className="neck" style={{ backgroundColor: look.skin }} />
        <div className="head" style={{ backgroundColor: look.skin }}>
          <span className={`hair ${look.hair}`} style={{ backgroundColor: look.hairColor }} />
          <span className="eye left" />
          <span className="eye right" />
          <span className="smile" />
        </div>
      </div>
    </div>
  );
}

export default CustomerCharacter;
