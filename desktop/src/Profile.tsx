import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Mail,
  Save,
  User as UserIcon,
} from "lucide-react";
import type { User } from "./types";

type ProfileProps = {
  user: User;
  onBack: () => void;
  onUpdateUser: (user: User) => void;
};

export default function Profile({
  user,
  onBack,
  onUpdateUser,
}: ProfileProps) {
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const updatedUser: User = {
      ...user,
      name: trimmedName,
    };

    localStorage.setItem(
      "devkit-user",
      JSON.stringify(updatedUser)
    );

    onUpdateUser(updatedUser);

    setName(trimmedName);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-header">
          <button
            type="button"
            className="profile-back"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div>
            <h1>Profile</h1>

            <p>
              Manage your DevKit account information.
            </p>
          </div>
        </header>

        <section className="profile-card">
          <div className="profile-identity">
            <div className="profile-avatar">
              <UserIcon size={32} />
            </div>

            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-divider" />

          <div className="profile-section">
            <div className="profile-section-header">
              <div>
                <h3>Personal information</h3>

                <p>
                  Update the information displayed on your
                  account.
                </p>
              </div>
            </div>

            <div className="profile-form">
              <label className="profile-field">
                <span>Name</span>

                <div className="profile-input-wrapper">
                  <UserIcon size={17} />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setSaved(false);
                    }}
                    placeholder="Your name"
                    maxLength={50}
                  />
                </div>
              </label>

              <label className="profile-field">
                <span>Email</span>

                <div className="profile-input-wrapper profile-input-disabled">
                  <Mail size={17} />

                  <input
                    type="email"
                    value={user.email}
                    disabled
                    readOnly
                  />
                </div>

                <small>
                  Email address cannot be changed here.
                </small>
              </label>
            </div>
          </div>

          <div className="profile-divider" />

          <div className="profile-section">
            <div className="profile-section-header">
              <div>
                <h3>Account</h3>

                <p>
                  Your account information stored locally
                  on this device.
                </p>
              </div>
            </div>

            <div className="profile-local-card">
              <div>
                <span className="profile-local-label">
                  Account status
                </span>

                <strong>Active</strong>
              </div>

              <div>
                <span className="profile-local-label">
                  Authentication
                </span>

                <strong>DevKit Account</strong>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button
              type="button"
              className="profile-cancel"
              onClick={onBack}
            >
              Cancel
            </button>

            <button
              type="button"
              className={`profile-save ${
                saved ? "profile-save-success" : ""
              }`}
              onClick={handleSave}
              disabled={!name.trim()}
            >
              {saved ? (
                <>
                  <Check size={17} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save changes
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}