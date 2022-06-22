import Leaflet from 'leaflet';

const mapIcon = Leaflet.icon({
  iconUrl: '/static/map-marker-purple.svg',
  iconSize: [29, 48],
  iconAnchor: [29, 48],
  popupAnchor: [160, 2]
});

export default mapIcon;