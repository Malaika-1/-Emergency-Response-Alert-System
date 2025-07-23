import React, { useEffect, useState } from 'react';
import { getRecentReports } from '../Service/api';

function LiveAlertFeed() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getRecentReports();
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch recent reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
    const interval = setInterval(fetchReports, 60000); // Refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>Live Alert Feed (Last 1 Hour)</h3>
      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No recent alerts.</p>
      ) : (
        <ul>
          {reports.map((r, idx) => (
            <li key={idx}>
              <strong>{r.emergencyType}</strong> in {r.locationName} <br />
              {new Date(r.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LiveAlertFeed;
