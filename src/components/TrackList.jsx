"use client";

const TrackList = ({ tracks }) => (
  <div className="w-full">
    {tracks.map((item) => (
      <div
        key={item.id}
        className="w-full grid grid-cols-[1fr_auto] gap-2.5 lg:grid-cols-4"
      >
        <div className="lg:col-start-1 lg:col-end-3">
          <span className="text-small leading-body tracking-body font-bold opacity-90 lg:opacity-75">
            {item.title} ({item.artist})
          </span>
        </div>

        <div className="text-end lg:col-start-4 lg:col-end-5">
          <span className="text-small leading-body tracking-body font-bold opacity-90 lg:opacity-75">
            {item.duration}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default TrackList;
