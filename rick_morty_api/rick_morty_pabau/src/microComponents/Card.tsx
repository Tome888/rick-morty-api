import { useLanguageContext } from "../context/LanguageContext";
import lang from "../translation/translate";
import CardInfo from "../Types/CardsType";

function Card({ id, name, status, species, gender, origin }: CardInfo) {
  const { langState } = useLanguageContext();
  const boxShadowFunc = (sp: string) => {
    if (sp === "Human" || sp === "Humanoid") {
      return "humanShadow";
    } else if (sp === "Alien") {
      return "alienShadow";
    } else {
      return "unknownShadow";
    }
  };

  return (
    <div key={id} className={`cardWrapper ${boxShadowFunc(species)}`}>
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
