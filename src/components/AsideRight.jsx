"use client";

import React from "react";
import { switzer } from "../../public/fonts";
import TrackList from "./TrackList";

const AsideRight = ({ featuredTracks, archiveTracks }) => {
  return (
    <aside className="contents lg:flex lg:flex-col lg:justify-between lg:col-start-10 lg:col-end-13">
      <span className="order-2 col-span-6 text-end text-body leading-body tracking-label font-semibold opacity-80">
        2026
      </span>

      <div className="order-5 col-span-12 flex flex-col gap-6 mt-10 md:gap-8 lg:mt-0 lg:gap-10">
        <span
          className={`${switzer.className} text-h3 md:text-h2 lg:text-body-lg tracking-label leading-subheading font-semibold opacity-95`}
        >
          Inertia <br /> Friction
        </span>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-10 lg:flex lg:flex-col lg:gap-10">
          <TrackList tracks={featuredTracks} />
          <TrackList tracks={archiveTracks} />
        </div>
      </div>
    </aside>
  );
};

export default AsideRight;
