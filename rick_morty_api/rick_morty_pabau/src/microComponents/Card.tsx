import { useLanguageContext } from "../context/LanguageContext";
import lang from "../translation/translate";
import CardInfo from "../Types/CardsType";

function Card({ id, name, status, species, gender, origin }: CardInfo) {
  const { langState } = useLanguageContext();
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
        <strong>{lang[langState].translations.statusFilter}: </strong>
        {status}
      </p>
      <p>
        <strong>{lang[langState].translations.speciesFilter}: </strong>
        {species}
      </p>
      <p>
        <strong>{lang[langState].translations.gender}: </strong> {gender}
      </p>
      <p>
        <strong>{lang[langState].translations.origin}: </strong> {origin.name}
      </p>
    </div>
  );
}

export default Card;
