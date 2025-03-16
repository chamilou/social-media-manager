"use client";
import { useState, useEffect } from "react";
import SchedulePostForm from "../components/schedulePosts/SchedulePostForm";

export default function SchedulePage() {
  const [accounts, setAccounts] = useState([]);

  // Fetch social media accounts on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch("/api/accounts");
        console.log("API Response:", res);

        // Check if the response is OK
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Parse the response as JSON
        const data = await res.json();
        console.log("API Data:", data);

        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h1>Schedule Posts</h1>
      <SchedulePostForm platform={accounts} />
    </div>
  );
}
