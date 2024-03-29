import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file

function EmojiFinder() {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(
          `https://emoji-api.com/emojis?access_key=012a87820736b64a3c928b71b8b7be4a3c924313`
        );
        const data = await response.json();
        setEmojis(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching emojis:", error);
        setLoading(false);
      }
    };

    fetchEmojis();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmojis = emojis.filter(
    (emoji) =>
      emoji.slug && emoji.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="emoji-finder-container">
      <h1>Emoji Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="emojis-grid">
          {filteredEmojis.length > 0 ? (
            filteredEmojis.map((emoji) => (
              <span key={emoji.slug} role="img" aria-label={emoji.slug}>
                {emoji.character}
              </span>
            ))
          ) : (
            <div className="no-emoji">No emojis found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default EmojiFinder;
