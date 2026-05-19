import CustomerCharacter from './CustomerCharacter';

type CustomerQueueProps = {
  levelIndex: number;
};

function CustomerQueue({ levelIndex }: CustomerQueueProps) {
  const visibleCustomers = Array.from({ length: 5 }, (_, offset) => levelIndex + offset);

  return (
    <div className="customer-queue" key={`queue-${levelIndex}`}>
      {visibleCustomers.map((customerSeed, position) => (
        <div className={`queue-position queue-position-${position}`} key={`${levelIndex}-${customerSeed}`}>
          <CustomerCharacter
            active={position === 0}
            label={position === 0 ? 'Active customer at the counter' : 'Customer waiting in line'}
            variant={customerSeed}
          />
        </div>
      ))}
    </div>
  );
}

export default CustomerQueue;
