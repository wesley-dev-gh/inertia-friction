"use client";

import useHome from "@/hooks/use-home";
import { data } from "@/data/data";
import Canvas from "@/components/Canvas";
import AsideLeft from "@/components/AsideLeft";
import AsideRight from "@/components/AsideRight";
import HomeContainer from "@/components/HomeContainer";

export default function Home() {
  const { canvasRef } = useHome();
  const { featuredTracks, archiveTracks } = data;
  return (
    <HomeContainer>
      <AsideLeft />
      <Canvas canvasRef={canvasRef} />
      <AsideRight
        featuredTracks={featuredTracks}
        archiveTracks={archiveTracks}
      />
    </HomeContainer>
  );
}
