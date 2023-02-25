import React, { useState } from "react";

function ZoomImage(props) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setShowMagnifier(true);

    const image = e.currentTarget;
    const container = image.getBoundingClientRect();
    const posX = e.clientX - container.left;
    const posY = e.clientY - container.top;
    const x = (posX / image.offsetWidth) * 100;
    const y = (posY / image.offsetHeight) * 100;

    setMagnifierPosition({ x, y });
  };

  const handleMouseLeave = (e) => {
    setShowMagnifier(false);
  };

  const magnifierStyle = {
    display: showMagnifier ? "block" : "none",
    position: "absolute",
    width: "370px",
    height: "290px",
    background: `url(${props.src}) no-repeat`,
    backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
    transform: "translate(-50%, -50%)",
    left: `${magnifierPosition.x}%`,
    top: `${magnifierPosition.y}%`,
    zIndex: 1,
  };

  const containerStyle = {
    position: "relative",
    width: props.width,
    height: "auto",
    maxHeight: props.height,
  };

  return (
    <div
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseLeave}
    >
      <img
        src={props.src}
        alt="Imagen"
        style={{ width: "100%", maxHeight: props.height }}
      />
      <div style={magnifierStyle} />
    </div>
  );
}

export default ZoomImage;
