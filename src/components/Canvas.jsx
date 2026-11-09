"use client";

import React from "react";

const Canvas = ({ canvasRef }) => {
  return (
    <div className="order-3 col-span-12 relative h-[48svh] min-h-80 my-6 sm:h-[52svh] lg:order-0 lg:col-start-2 lg:col-end-9 lg:h-full lg:min-h-0 lg:my-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-pan-y"
      />
    </div>
  );
};

export default Canvas;
