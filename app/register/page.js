"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css"; // Assuming you will style it
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Assuming you have some API endpoint or logic to register the user
    // Example (this part should be replaced with your backend logic)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to login page after successful registration
        router.push("/login");
      } else {
        console.error("Registration failed");
        // Handle error appropriately (e.g., show error message)
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>
        <form onSubmit={handleRegister} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.formButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
