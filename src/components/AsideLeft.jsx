"use client";

const AsideLeft = () => {
  return (
    <aside className="contents lg:flex lg:flex-col lg:justify-between lg:col-start-1 lg:col-end-2 lg:h-full">
      <span className="order-1 col-span-6 text-body leading-body tracking-label font-semibold opacity-80">
        01-08
      </span>

      <span className="order-4 col-span-12 text-body-lg leading-subheading tracking-label font-semibold opacity-80 lg:text-body lg:leading-body">
        Kinetic <br className="hidden lg:block" /> State
      </span>
    </aside>
  );
};

export default AsideLeft;
