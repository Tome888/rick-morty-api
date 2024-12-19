import CardInfo from "../Types/CardsType";

function Card({ id, name, status, species, gender, origin }: CardInfo) {
  return (
    <div
      key={id}
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        width: "200px",
      }}
    >
      <h2>{name}</h2>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Species:</strong> {species}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>
      <p>
        <strong>Origin:</strong> {origin.name}
      </p>
    </div>
  );
}

export default Card;
