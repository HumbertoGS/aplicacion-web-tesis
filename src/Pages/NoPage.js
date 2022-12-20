import React from "react";

const NoPage = () => {
  const [counter, setCounter] = React.useState(404);
  return (
    <>
      <div>
        <h1>PAGE NOT FOUND</h1>
        <h3 data-testid="counter">{counter}</h3>
      </div>
    </>
  );
};

export default NoPage;
