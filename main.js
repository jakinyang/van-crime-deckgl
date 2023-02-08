import './style.css'
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { mapStyle } from './mapstyle'

const sourceData = './crime.json';

const scatterplot = () => new ScatterplotLayer({
  id: 'scatter',
  data: sourceData,
  opacity: 0.8,
  filled: true,
  radiusMinPixels: 2,
  radiusMaxPixels: 5,
  getPosition: d => [d.Longitude, d.Latitude],
  getFillColor: d => {
    const year = new Date().getFullYear()
    const recency = year - d.YEAR
    if (recency > 10) {
      return [50, 50, 44, 100]
    } else if (recency > 6) {
      return [255, 200, 87, 100]
    } else if (recency > 3) {
      return [255, 75, 10, 100]
    } else {
      return [221, 69, 64, 100]
    }
  },
  pickable: true,
  onHover: ({ object, x, y }) => {
    const el = document.getElementById('tooltip');
    if (object) {
      const { TYPE, YEAR, MONTH, DAY, NEIGHBOURHOOD } = object;
      el.innerHTML = `<h1>${TYPE} HAPPENED ON ${YEAR}-${MONTH}-${DAY} IN ${NEIGHBOURHOOD ? NEIGHBOURHOOD : "AN UNDISCLOSED NEIGHBOURHOOD"}</h1>`
      el.style.display = 'block';
      el.style.opacity = 0.9;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    } else {
      el.style.opacity = 0.0;
    }
  },
});

const heatmap = () => new HeatmapLayer({
  id: 'heat',
  data: sourceData,
  getPosition: d => [d.Longitude, d.Latitude],
  getWeight: d => (d.YEAR - 2003),
  radiusPixels: 60,
});

const hexagon = () => new HexagonLayer({
  id: 'hex',
  data: sourceData,
  getPosition: d => [d.Longitude, d.Latitude],
  elevationScale: 1000,
  extruded: true,
  radius: 50,         
  opacity: 0.6,        
  coverage: 0.75,
});

window.initMap = () => {
  const map = new google.maps.Map(document.querySelector('#map'), {
    center: {
      lat: 49.2827,
      lng: -123.1207,
    },
    zoom: 13,
    styles: mapStyle
  });
  const overelay = new GoogleMapsOverlay({
    layers: [
      // scatterplot(),
      // heatmap(),
      hexagon()
    ]
  })
  overelay.setMap(map);
}