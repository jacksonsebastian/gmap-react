import {
  GoogleMap,
  Marker,
  Polygon,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import "./App.css";
import json from "./data.json";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const marks = [
  {
    areaName: "Trichy",
    lat: 10.790483,
    lng: 78.704674,
  },
  {
    areaName: "Karur",
    lat: 10.960078,
    lng: 78.076607,
  },
  {
    areaName: "Coimbatore",
    lat: 11.016844,
    lng: 76.955833,
  },
  {
    areaName: "Delhi",
    lat: 28.698016,
    lng: 77.233264,
  },
  {
    areaName: "Mumbai",
    lat: 19.085442,
    lng: 72.861262,
  },
  {
    areaName: "Kolkata",
    lat: 21.901339,
    lng: 87.672427,
  },
];

const polygonCoordsCbe = json.coordinatesCbe.map((coord) => ({
  lng: coord[0],
  lat: coord[1],
}));
const polygonCoordsTrichy = json.coordinatesTrichy.map((coord) => ({
  lng: coord[0],
  lat: coord[1],
}));
const polygonCoordsKarur = json.coordinatesKarur.map((coord) => ({
  lng: coord[0],
  lat: coord[1],
}));

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  const [mapInfoWindowOpen, setMapInfoWindowOpen] = useState(false);
  const [mapInfoWindowPosition, setMapInfoWindowPosition] = useState(null);
  const [polygonInfoWindowOpen, setPolygonInfoWindowOpen] = useState(false);

  const handleMapClick = (event) => {
    setMapInfoWindowPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setMapInfoWindowOpen(true);
  };

  const handlePolygonClick = () => {
    setPolygonInfoWindowOpen(true);
  };

  const handleMapInfoWindowClose = () => {
    setMapInfoWindowOpen(false);
  };
  const handlePolygonInfoWindowClose = () => {
    setPolygonInfoWindowOpen(false);
  };

  const onMapLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    marks.map((mark) =>
      bounds.extend(new window.google.maps.LatLng(mark.lat, mark.lng))
    );
    map.fitBounds(bounds);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Map
      handleMapClick={handleMapClick}
      handlePolygonClick={handlePolygonClick}
      handleMapInfoWindowClose={handleMapInfoWindowClose}
      handlePolygonInfoWindowClose={handlePolygonInfoWindowClose}
      mapInfoWindowOpen={mapInfoWindowOpen}
      polygonInfoWindowOpen={polygonInfoWindowOpen}
      mapInfoWindowPosition={mapInfoWindowPosition}
      onMapLoad={onMapLoad}
    />
  );
}

function Map({
  handleMapClick,
  handlePolygonClick,
  handleMapInfoWindowClose,
  handlePolygonInfoWindowClose,
  mapInfoWindowOpen,
  polygonInfoWindowOpen,
  mapInfoWindowPosition,
  onMapLoad,
}) {
  const bounds = new window.google.maps.LatLngBounds();
  marks.map((mark) =>
    bounds.extend(new window.google.maps.LatLng(mark.lat, mark.lng))
  );
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={bounds.getCenter()}
      zoom={10}
      onClick={handleMapClick}
      onLoad={onMapLoad}
    >
      {marks.map((mark, index) => (
        <Marker
          key={index}
          position={{ lat: mark.lat, lng: mark.lng }}
          onClick={() => {
            setSelectedMarker(mark);
          }}
        />
      ))}
      <Polygon
        path={polygonCoordsCbe}
        options={{
          fillColor: "#00ff00",
          fillOpacity: 0.35,
          strokeColor: "#00ff00",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
        onClick={handlePolygonClick}
      />
      <Polygon
        path={polygonCoordsTrichy}
        options={{
          fillColor: "#00ff00",
          fillOpacity: 0.35,
          strokeColor: "#00ff00",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
        onClick={handlePolygonClick}
      />
      <Polygon
        path={polygonCoordsKarur}
        options={{
          fillColor: "#00ff00",
          fillOpacity: 0.35,
          strokeColor: "#00ff00",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
        onClick={handlePolygonClick}
      />

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>
            <h3>{selectedMarker.areaName}</h3>
          </div>
        </InfoWindow>
      )}

      {mapInfoWindowOpen && (
        <InfoWindow
          position={mapInfoWindowPosition}
          onCloseClick={handleMapInfoWindowClose}
        >
          <div>False</div>
        </InfoWindow>
      )}
      {polygonInfoWindowOpen && (
        <InfoWindow
          position={marks[0]}
          onCloseClick={handlePolygonInfoWindowClose}
        >
          <div>True</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default App;
