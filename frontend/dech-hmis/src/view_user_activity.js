import React, { useState, useEffect } from 'react';

const ViewUserActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch user activity from backend
    const fetchActivity = async () => {
      const response = await fetch('/api/user-activity');
      const data = await response.json();
      setActivities(data);
    };

    fetchActivity();
  }, []);

  return (
    <div>
      <h2>View User Activity</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.user} - {activity.action} on {activity.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUserActivity;
