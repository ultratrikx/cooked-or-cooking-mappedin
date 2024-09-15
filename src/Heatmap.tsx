// import React from 'react';
// import {createRoot} from 'react-dom/client';
// import {Map} from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import DATA_URL from './room_pairings.json';

import type {MapViewState} from '@deck.gl/core';

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 43.472927585199656,
  longitude: -80.5395512817402,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

type DataPoint = [latitude: number, longitude: number, count: number];

export default function App({
  data = DATA_URL as DataPoint[],
  intensity = 1,
  threshold = 0.000001,
  radiusPixels = 50,
  // mapStyle = MAP_STYLE
}: {
  data?: string | DataPoint[];
  intensity?: number;
  threshold?: number;
  radiusPixels?: number;
  mapStyle?: string;
}) {
  const layers = [
    new HeatmapLayer<DataPoint>({
      data,
      id: 'heatmap-layer',
      pickable: false,
      getPosition: d => [d[0], d[1]],
      getWeight: d => d[2],
      radiusPixels,
      intensity,
      threshold
    })
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      {/* <Map reuseMaps mapStyle={mapStyle} /> */}
    </DeckGL>
  );
}