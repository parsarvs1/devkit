"use client";

import { useState } from "react";

interface EditProfileProps {
  initialName: string;
}

export default function EditProfile({ initialName }: EditProfileProps) {
  const [name, setName] = useState(initialName);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setName(data.name);
      setMessage("Profile updated successfully.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="profile-edit" onSubmit={handleSubmit}>
      <div className="profile-edit-header">
        <div>
          <span className="profile-edit-label">Profile Settings</span>

          <h2>Edit Profile</h2>
        </div>
      </div>

      <div className="profile-edit-field">
        <label htmlFor="profile-name">
          Name <span aria-hidden="true">*</span>
        </label>

        <input
          id="profile-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          maxLength={50}
          disabled={loading}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error
              ? "profile-error"
              : message
                ? "profile-message"
                : undefined
          }
        />
      </div>

      {message && (
        <p
          id="profile-message"
          className="profile-edit-success"
          role="status"
        >
          {message}
        </p>
      )}

      {error && (
        <p
          id="profile-error"
          className="profile-edit-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <button className="profile-edit-button" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
