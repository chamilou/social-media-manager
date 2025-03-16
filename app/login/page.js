"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./Login.module.css"; // Import the CSS module
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMagicLink, setIsMagicLink] = useState(true); // Toggle between magic link and password login
  const router = useRouter();

  async function handleMagicLink(e) {
    e.preventDefault();
    if (email) {
      await signIn("email", { email });
      alert("Check your email for a magic link!");
    }
  }

  async function handlePasswordLogin(e) {
    e.preventDefault();
    if (email && password) {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        alert(result.error);
      } else {
        // alert("Logged in successfully!");
        router.push("/"); // Redirect or handle successful login
      }
    } else {
      alert("Please enter both email and password.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        {/* Google Login Button */}
        <button onClick={() => signIn("google")} className={styles.button}>
          Login with Google
        </button>

        {/* GitHub Login Button */}
        <button onClick={() => signIn("github")} className={styles.button}>
          Login with GitHub
        </button>

        {/* Facebook Login Button */}
        <button onClick={() => signIn("facebook")} className={styles.button}>
          Login with Facebook
        </button>

        {/* Toggle between Magic Link and Password Login */}
        <div className={styles.toggleContainer}>
          <button
            onClick={() => setIsMagicLink(true)}
            className={`${styles.toggleButton} ${
              isMagicLink ? styles.active : ""
            }`}
          >
            Magic Link
          </button>
          <button
            onClick={() => setIsMagicLink(false)}
            className={`${styles.toggleButton} ${
              !isMagicLink ? styles.active : ""
            }`}
          >
            Password
          </button>
        </div>

        {/* Email Login Form */}
        <form
          onSubmit={isMagicLink ? handleMagicLink : handlePasswordLogin}
          className={styles.form}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isMagicLink && (
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <button type="submit" className={styles.formButton}>
            {isMagicLink ? "Send Magic Link" : "Login with Password"}
          </button>
        </form>

        {/* Register Link */}
        <p className={styles.registerText}>
          Don't have an account?{" "}
          <Link href="/register" className={styles.registerLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
