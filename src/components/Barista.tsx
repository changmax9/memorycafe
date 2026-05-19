function Barista() {
  return (
    <div className="barista" aria-label="Friendly barista behind the counter">
      <div className="barista-shadow" />
      <div className="barista-arm left" />
      <div className="barista-arm right" />
      <div className="barista-body">
        <div className="barista-shirt" />
        <div className="apron">
          <span />
        </div>
      </div>
      <div className="barista-neck" />
      <div className="barista-head">
        <div className="barista-hair" />
        <span className="barista-eye left" />
        <span className="barista-eye right" />
        <span className="barista-smile" />
      </div>
    </div>
  );
}

export default Barista;
