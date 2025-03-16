"use client";

import { useState } from "react";
import styles from "./Report.module.css";
import { Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Report() {
  // Dummy data for charts
  const followersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Followers",
        data: [100, 200, 400, 600, 800, 1000],
        borderColor: "#4CAF50",
        fill: false,
      },
    ],
  };

  const likesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Likes",
        data: [50, 150, 300, 500, 700, 900],
        borderColor: "#FF9800",
        fill: false,
      },
    ],
  };

  const impressionsData1 = {
    labels: ["Twitter", "Facebook", "Instagram", "LinkedIn"],
    datasets: [
      {
        data: [3000, 4500, 2500, 1500],
        backgroundColor: ["#1DA1F2", "#1877F2", "#C13584", "#0A66C2"],
      },
    ],
  };

  const impressionsData2 = {
    labels: ["Twitter", "Facebook", "Instagram", "LinkedIn"],
    datasets: [
      {
        data: [2000, 3000, 4000, 1000],
        backgroundColor: ["#1DA1F2", "#1877F2", "#C13584", "#0A66C2"],
      },
    ],
  };

  const financialData = [
    { platform: "Google Ads", clicks: 500, cost: "$150" },
    { platform: "Facebook Ads", clicks: 800, cost: "$200" },
    { platform: "Instagram Ads", clicks: 600, cost: "$180" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Social Media Report</h1>

      {/* First Row: Two Line Charts */}
      <div className={styles.chartContainerHome}>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <h2>Followers Growth</h2>
            <Line data={followersData} />
          </div>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <h2>Likes Over Time</h2>
            <Line data={likesData} />
          </div>
        </div>
      </div>

      {/* Second Row: Two Pie Charts */}
      <div className={styles.chartContainerHome}>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <h2>Impressions by Platform (Q1)</h2>
            <Pie data={impressionsData1} />
          </div>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <h2>Impressions by Platform (Q2)</h2>
            <Pie data={impressionsData2} />
          </div>
        </div>
      </div>

      {/* Third Row: Table */}
      <div className={styles.tableContainer}>
        <h2>Financial Report - Ad Spend</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Clicks</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((row, index) => (
              <tr key={index}>
                <td>{row.platform}</td>
                <td>{row.clicks}</td>
                <td>{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
