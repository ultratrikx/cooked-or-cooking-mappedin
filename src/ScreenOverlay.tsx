// import React from 'react';
import DeckGL from '@deck.gl/react';
import {ScreenGridLayer} from '@deck.gl/aggregation-layers';
import DATA_URL from './room_pairings.json';


type Users = {
  latitude: number;
  longitude: number;
  productivity_score: number;
};

export default function ScreenOverlay() {
  const layer = new ScreenGridLayer<Users>({
    // Add type argument to the constructor
    type: ScreenGridLayer,
    id: 'ScreenGridLayer',
    data: DATA_URL,

    cellSizePixels: 50,
    colorRange: [
      [0, 25, 0, 25],
      [0, 85, 0, 85],
      [0, 127, 0, 127],
      [0, 170, 0, 170],
      [0, 190, 0, 190],
      [0, 255, 0, 255]
    ],
    getPosition: (d: Users) => [d.longitude, d.latitude],
    getWeight: (d: Users) => d.productivity_score,
    opacity: 0.8
  });

  return <DeckGL
    initialViewState={{
      longitude: 43.472927585199656,
      latitude: -80.5395512817402,
      zoom: 9,
    }}
    controller
    layers={[layer]}
  />;
}