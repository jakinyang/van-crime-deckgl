import './style.css'

window.initMap = () => {
  const map = new google.maps.Map(document.querySelector('#map'), {
    center: {
      lat: 49.2827,
      lng: -123.1207,
    },
    zoom: 13,
  });
}