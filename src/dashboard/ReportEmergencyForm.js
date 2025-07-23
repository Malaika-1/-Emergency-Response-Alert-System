import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { submitReport } from '../Service/api'; // ✅ correct import
import './reportform.css';
const getLocationName = async (lat, lng) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
  const data = await res.json();
  return data.display_name;
};

function LocationSelector({ setCoords, setLocName }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setCoords([lat, lng]);
      const name = await getLocationName(lat, lng);
      setLocName(name);
    },
  });
  return null;
}

export default function ReportEmergencyForm() {
  const [type, setType] = useState('');
  const [coords, setCoords] = useState(null);
  const [locName, setLocName] = useState('');
  const [msg, setMsg] = useState('');
  const user = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !coords || !user?.email) {
      setMsg('Please select type, click on map, and make sure you are logged in.');
      return;
    }

    const [lat, lng] = coords;

    const payload = {
      emergencyType: type,
      latitude: lat.toString(),
      longitude: lng.toString(),
      locationName: locName || 'Unnamed',
      email: user.email,
    };

    try {
      await submitReport(payload);
      setMsg(`${type} emergency reported successfully!`);
      // reset
      setType('');
      setCoords(null);
      setLocName('');
    } catch (error) {
      console.error(error);
      setMsg('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Report Emergency</h3>
      <select value={type} onChange={e => setType(e.target.value)} required>
        <option value="">--Select--</option>
        <option>Fire</option>
        <option>Flood</option>
        <option>Earthquake</option>
        <option>Medical</option>
        <option>Other</option>
      </select>

      <MapContainer center={[33.6844, 73.0479]} zoom={10} style={{ height: 200 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSelector setCoords={setCoords} setLocName={setLocName} />
        {coords && <Marker position={coords} />}
      </MapContainer>

      <p><strong>Location:</strong> {locName || <span style={{ color: 'red' }}>Click on map</span>}</p>

      <button type="submit">Submit</button>
      {msg && <p style={{ color: msg.includes('failed') ? 'red' : 'green' }}>{msg}</p>}
    </form>
  );
}
