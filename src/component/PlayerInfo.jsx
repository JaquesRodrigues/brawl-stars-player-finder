import { useState, useEffect } from "react";

export default function PlayerInfo({ playerId }) {
  const [playerInfo, setPlayerInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_ENDPOINT}/api/player/${playerId}`
        );

        if (!response.ok) {
          throw new Error("Error fetching player info");
        }

        const data = await response.json();
        setPlayerInfo(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPlayerInfo();
  }, [playerId]);

  return (
    <>
      <h1>Player Info:</h1>
      {playerInfo ? (
        <div>
          <p>Nome: {playerInfo.name}</p>
          <p>Trofeus: {playerInfo.trophies}</p>
          <p>Recorde de Trofeus: {playerInfo.highestTrophies}</p>
          <p>Clube: {playerInfo.club.name}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
