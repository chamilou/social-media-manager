"use client";
import { useState, useEffect } from "react";
import styles from "./SchedulePostForm.module.css";
import { useRouter } from "next/navigation";

export default function SchedulePostForm() {
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Fetch only the logged-in user's accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch("/api/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      } else {
        console.error("Failed to fetch accounts");
      }
    };
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId,
        content,
        mediaUrl,
        scheduledAt,
      }),
    });

    const data = await res.json();
    console.log("Received Payload:", {
      accountId,
      content,
      mediaUrl,
      scheduledAt,
    });

    if (res.ok) {
      alert("Post scheduled successfully!");
      setAccountId("");
      setContent("");
      setMediaUrl("");
      setScheduledAt("");
      router.push("/dashboard"); // Redirect to dashboard back
    } else {
      alert("Failed to schedule post. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Choose Account:</label>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
          className={styles.dropdown}
        >
          <option value="">Select an Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.platform} - {acc.username}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="mediaUrl">Media URL (optional)</label>
        <input
          type="text"
          id="mediaUrl"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="scheduledAt">Scheduled At</label>
        <input
          type="datetime-local"
          id="scheduledAt"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        {isSubmitting ? "Scheduling..." : "Schedule Post"}
      </button>
    </form>
  );
}
