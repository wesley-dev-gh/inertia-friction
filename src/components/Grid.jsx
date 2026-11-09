"use client";

const Grid = ({ children, cN }) => {
  return (
    <div
      className={`${cN && cN} w-full grid grid-cols-4 lg:grid-cols-12 gap-2.5`}
    >
      {children}
    </div>
  );
};

export default Grid;
