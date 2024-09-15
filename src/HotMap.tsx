import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

// Assume room_pairings.json is imported
import roomPairings from './room_pairings.json';
const loca = [43.473245784148304, -80.5398160956897];
const DeckGLHeatmap = () => {
  const [viewState, setViewState] = useState({
    latitude: loca[0],
    longitude: loca[1],
    zoom: 18,
    pitch: 0,
    bearing: 0
  });

  const layers = [
    new HeatmapLayer({
      id: 'heatmap-layer',
      data: roomPairings,
      getPosition: d => [d[0]-0.0000123412, d[1]],
      getWeight: d => d[2],
      radiusPixels: 50,
      intensity: 1,
      threshold: 0.05,
      colorRange: [
        [0, 0, 255],
        [0, 255, 0],
        [255, 255, 0],
        [255, 0, 0]
      ]
    })
  ];

  return (
    <DeckGL
      initialViewState={viewState}
      controller={true}
      layers={layers}
      onViewStateChange={({ viewState }) => setViewState(viewState)}
    >
      {/* No base map */}
    </DeckGL>
  );
};

export default DeckGLHeatmap;