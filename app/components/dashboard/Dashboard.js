"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { data: session } = useSession();
  const [socialMediaAccounts, setSocialMediaAccounts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [platform, setPlatform] = useState("");
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("accounts"); // Track selected category

  // Fetch data on component mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData(session.user.id);
    }
  }, [session]);

  const fetchDashboardData = async (userId) => {
    const res = await fetch(`/api/dashboard?userId=${userId}`);
    const data = await res.json();
    setSocialMediaAccounts(data.socialMediaAccounts);
    setPosts(data.posts);
    setAnalytics(data.analytics);
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();

    // Send the new account data to the backend
    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        platform,
        username,
        profileUrl,
      }),
    });

    if (res.ok) {
      // Refresh the accounts list
      fetchDashboardData(session.user.id);
      // Reset the form
      setPlatform("");
      setUsername("");
      setProfileUrl("");
      setShowAddAccountForm(false);
    } else {
      alert("Failed to add account. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Dashboard</h2>
        <ul className={styles.sidebarMenu}>
          <li
            className={`${styles.sidebarItem} ${
              selectedCategory === "accounts" ? styles.active : ""
            }`}
            onClick={() => {
              console.log("Selected Category: Accounts"); // Debugging
              setSelectedCategory("accounts");
            }}
          >
            Accounts
          </li>
          <li
            className={`${styles.sidebarItem} ${
              selectedCategory === "scheduledPosts" ? styles.active : ""
            }`}
            onClick={() => {
              console.log("Selected Category: Scheduled Posts"); // Debugging
              setSelectedCategory("scheduledPosts");
            }}
          >
            Scheduled Posts
          </li>
          <li
            className={`${styles.sidebarItem} ${
              selectedCategory === "analytics" ? styles.active : ""
            }`}
            onClick={() => {
              console.log("Selected Category: Analytics"); // Debugging
              setSelectedCategory("analytics");
            }}
          >
            Analytics
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Dashboard</h1>

        {/* Add Account Button */}
        {selectedCategory === "accounts" && (
          <button
            onClick={() => setShowAddAccountForm(!showAddAccountForm)}
            className={`${styles.button} ${styles.buttonBlue}`}
          >
            {showAddAccountForm ? "Cancel" : "Add Social Media Account"}
          </button>
        )}

        {/* Add Account Form */}
        {showAddAccountForm && selectedCategory === "accounts" && (
          <form onSubmit={handleAddAccount} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="platform">Platform</label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option value="">Select Platform</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profileUrl">Profile URL</label>
              <input
                type="text"
                id="profileUrl"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.button}>
              Add Account
            </button>
          </form>
        )}

        {/* Social Media Accounts */}
        {selectedCategory === "accounts" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Social Media Accounts</h2>
            <div className={`${styles.grid} ${styles.gridCols3}`}>
              {socialMediaAccounts.map((account) => (
                <div key={account.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>{account.platform}</h3>
                  <p className={styles.cardText}>
                    Username: {account.username}
                  </p>
                  <p className={styles.cardText}>
                    Followers: {account.followers}
                  </p>
                  <p className={styles.cardText}>
                    Following: {account.following}
                  </p>
                  <p className={styles.cardText}>
                    Last Updated:{" "}
                    {new Date(account.lastUpdated).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Scheduled Posts */}
        {selectedCategory === "scheduledPosts" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Scheduled Posts</h2>
            <div className={styles.grid}>
              {posts.map((post) => (
                <div key={post.id} className={styles.card}>
                  <p>{post.content}</p>
                  <p className={styles.cardText}>
                    Scheduled at: {new Date(post.scheduledAt).toLocaleString()}
                  </p>
                  <p className={styles.cardText}>Status: {post.status}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engagement Analytics */}
        {selectedCategory === "analytics" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Engagement Analytics</h2>
            <div className={`${styles.grid} ${styles.gridCols2}`}>
              {analytics.map((metric) => (
                <div key={metric.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    {metric.account.platform}
                  </h3>
                  <p className={styles.cardText}>
                    Followers: {metric.followers}
                  </p>
                  <p className={styles.cardText}>Likes: {metric.likes}</p>
                  <p className={styles.cardText}>Comments: {metric.comments}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <Link
            href="/schedule"
            className={`${styles.button} ${styles.buttonBlue}`}
          >
            Schedule a Post
          </Link>
          <Link
            href="/auto-post"
            className={`${styles.button} ${styles.buttonGreen}`}
          >
            Auto-Post from Folder
          </Link>
        </div>
      </div>
    </div>
  );
}
