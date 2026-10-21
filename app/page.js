"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const REQUIRED_EMAIL = "@gmail.com";
const MIN_PASSWORD_LENGTH = 6; // password must be MORE than 6 characters

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  function validate() {
    const next = {};
    const trimmed = email.trim();

    if (trimmed === "") {
      next.email = "Email is required.";
    } else if (!trimmed.toLowerCase().endsWith(REQUIRED_EMAIL)) {
      next.email = `Email must be a ${REQUIRED_EMAIL} address.`;
    } else if (trimmed.length <= REQUIRED_EMAIL.length) {
      next.email = "Please enter your username before @gmail.com.";
    }

    if (password === "") {
      next.password = "Password is required.";
    } else if (password.length <= MIN_PASSWORD_LENGTH) {
      next.password = `Password must be more than ${MIN_PASSWORD_LENGTH} characters.`;
    }

    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Bonus 1: error message below the login button
      setFormError("Login failed. Please fix the errors above and try again.");
      return;
    }

    setFormError("");
    sessionStorage.setItem("note-app-user", email.trim());
    router.push("/notes");
  }

  return (
    <main className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <div className="logo">📝</div>
        <h1>Welcome to Notely</h1>
        <p className="subtitle">Log in to view and manage your notes.</p>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@gmail.com"
            value={email}
            className={errors.email ? "invalid" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            className={errors.password ? "invalid" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="field-error">{errors.password}</p>}
        </div>

        <button type="submit" className="btn">
          Log in
        </button>

        {formError && <p className="form-error">{formError}</p>}
      </form>
    </main>
  );
}
