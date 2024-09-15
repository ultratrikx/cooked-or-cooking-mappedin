import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

// Assume room_pairings.json is imported
import roomPairings from './room_pairings.json';
const loca = [43.473245784148304, -80.5398160956897];

const Legend = () => (
  <div style={{
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    background: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ margin: '0 0 10px 0' }}>Heat Intensity</h3>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
      <div style={{ width: '20px', height: '20px', background: 'rgb(0, 0, 255)', marginRight: '10px' }}></div>
      <span>Low</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
      <div style={{ width: '20px', height: '20px', background: 'rgb(0, 255, 0)', marginRight: '10px' }}></div>
      <span>Medium</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
      <div style={{ width: '20px', height: '20px', background: 'rgb(255, 255, 0)', marginRight: '10px' }}></div>
      <span>High</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '20px', height: '20px', background: 'rgb(255, 0, 0)', marginRight: '10px' }}></div>
      <span>Very High</span>
    </div>
  </div>
);


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
    <Legend />
  );
};

export default DeckGLHeatmap;
