import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8082/api";

export default function LoginPage() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

async function handleSubmit(
event: React.FormEvent<HTMLFormElement>,
) {
event.preventDefault();

try {
  setLoading(true);
  setError(null);

  const response = await fetch(
    API_URL + "/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);

  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data.id,
      name: data.name,
      email: data.email,
    }),
  );

  navigate("/dashboard");
} catch (error) {
  console.error("Login failed:", error);
  setError("Impossible de se connecter");
} finally {
  setLoading(false);
}


}

return (
<div className="auth-page">
<div className="auth-card">
<h1>Connexion</h1>

    <p>
      Connectez-vous à votre compte TaskFlow.
    </p>

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Mot de passe
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        className="primary-button"
        disabled={loading}
      >
        {loading
          ? "Connexion..."
          : "Se connecter"}
      </button>
    </form>
  </div>
</div>


);
}