interface FavoriteStarProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteStarComponent: React.FC<FavoriteStarProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <button
      className="btn favorite-button"
      onClick={(e) => {
        e.stopPropagation(); // prevent card click from triggering
        onToggle();
      }}
      style={{
        fontSize: "2rem",
        color: isFavorite ? "gold" : "#ccc",
        background: "none",
        border: "none",
        outline: "none",
        cursor: "pointer",
        marginBottom: "9px",
        transition: "color 0.3s ease",
      }}
      aria-label="Toggle Favorite"
    >
      {isFavorite ? "⭐" : "☆"}
    </button>
  );
};

export default FavoriteStarComponent;
