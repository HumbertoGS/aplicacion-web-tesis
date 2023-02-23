const NoPage = () => {
  const counter = 404;

  return (
    <>
      <div className="form-padre">
        <h1>PAGE NOT FOUND</h1>
        <h3 data-testid="counter">
          <br />
          {counter}
        </h3>
      </div>
    </>
  );
};

export default NoPage;
