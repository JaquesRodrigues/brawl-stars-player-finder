import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [postLink, setPostLink] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playerId) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_ENDPOINT}/api/player/${playerId}`
      );

      if (!response.ok) {
        throw new Error("Error fetching player info");
      }

      const data = await response.json();
      setPostLink((prevLinks) => [...prevLinks, data]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="player">Search Player</label>
        <input
          className="input"
          type="text"
          id="player"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />
        <button type="submit">Search</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {postLink.length > 0 &&
        postLink.map((post, index) => {
          const tag = post.tag.replace("#", "");
          return (
            <div key={index}>
              <Link to={`/player/${tag}`}>{post.name}</Link>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
