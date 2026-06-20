import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LiveMap() {
  const [route, setRoute] = useState([]);
  const [distanceInfo, setDistanceInfo] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Mock Data: Officer is in New Delhi, Incident is far away
  const officerLocation = { lat: 28.6139, lng: 77.2090 }; 
  const incidentLocation = { lat: 28.5355, lng: 77.2410 }; 

  const MAX_DISTANCE_KM = 5; // Alert threshold

  useEffect(() => {
    // Fetch Driving Route from OSRM API (Free Open Source Routing)
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${officerLocation.lng},${officerLocation.lat};${incidentLocation.lng},${incidentLocation.lat}?geometries=geojson`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          // Extract the path coordinates
          const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRoute(coordinates);

          // Get distance in KM
          const distanceKm = (data.routes[0].distance / 1000).toFixed(2);
          setDistanceInfo(`${distanceKm} km`);

          // Automated Alert Logic based on distance
          if (distanceKm > MAX_DISTANCE_KM) {
            setAlerts([
               `Officer is ${distanceKm} km away. Exceeds ${MAX_DISTANCE_KM}km threshold.`,
               "Auto-Dispatching local backup from nearest station."
            ]);
          } else {
             setAlerts([]); 
          }
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "15px" }}>🗺️ Live Dispatch & Routing</h2>

      {/* Alert Banner */}
      {alerts.length > 0 && (
        <div style={{ background: "rgba(255, 68, 68, 0.2)", border: "1px solid #ff4444", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
          <h3 style={{ color: "#ff4444", margin: 0 }}>⚠️ ESCALATION ALERT</h3>
          {alerts.map((msg, idx) => (
            <p key={idx} style={{ margin: "5px 0 0 0", color: "#ffcccc" }}>{msg}</p>
          ))}
        </div>
      )}

      {/* Map Container */}
      <div style={{ flex: 1, borderRadius: "15px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
        <MapContainer 
          center={[28.57, 77.22]} 
          zoom={12} 
          style={{ height: "100%", width: "100%", background: "#111827" }}
        >
          {/* Dark Mode Map Tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          {/* Officer Marker */}
          <Marker position={[officerLocation.lat, officerLocation.lng]}>
            <Popup>
              <b>🚓 Officer Unit 104</b><br/>
              Status: Responding
            </Popup>
          </Marker>

          {/* Incident Marker */}
          <Marker position={[incidentLocation.lat, incidentLocation.lng]}>
            <Popup>
              <b>🚨 10-42: Armed Robbery</b><br/>
              Priority: High
            </Popup>
          </Marker>

          {/* The Route Line */}
          {route.length > 0 && (
             <Polyline 
                positions={route} 
                color="#00e5ff" 
                weight={5} 
                dashArray="10, 10" 
             />
          )}
        </MapContainer>
      </div>

      {/* Status Footer */}
      {distanceInfo && (
        <div style={{ marginTop: "15px", padding: "15px", background: "rgba(255,255,255,0.05)", borderRadius: "10px" }}>
           <span>Route Calculated via OSRM. Driving Distance: <b style={{color: "#00e5ff"}}>{distanceInfo}</b></span>
        </div>
      )}
    </div>
  );
}