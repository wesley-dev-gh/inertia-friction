"use client";

import Grid from "./Grid";

const HomeContainer = ({ children }) => {
  return (
    <section className="bg-[#1c1c1c] text-[#ece7df] w-full min-h-svh lg:min-h-0 lg:h-dvh p-5 sm:p-7">
      <Grid cN={"lg:h-full"}>{children}</Grid>
    </section>
  );
};

export default HomeContainer;
