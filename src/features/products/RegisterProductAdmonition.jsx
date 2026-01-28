import Admonition from "@/ui/Admonition";

function RegisterProductAdmonition({ brand }) {
  if (!brand?.background) return null;
  return (
    <Admonition variation="primary" icon="accent">
      <h4>Réponse générale de la marque {brand.name}</h4>
      {brand.background}
    </Admonition>
  );
}

export default RegisterProductAdmonition;
