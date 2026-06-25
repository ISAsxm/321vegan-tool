import { useSearchParams } from "react-router-dom";
import { useConfirmEmailChange } from "./useEmailChange";

import Spinner from "@/ui/Spinner";

function ConfirmEmailChangeForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isLoading, error, isSuccess } = useConfirmEmailChange(token);

  if (!token) {
    return (
      <div>
        <h2>Lien invalide</h2>
        <p>
          Le lien de confirmation est invalide. Veuillez réessayer depuis votre
          profil.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !isSuccess) {
    return (
      <div>
        <h2>Lien invalide ou expiré</h2>
        <p>
          Le lien de confirmation de changement d&apos;adresse e-mail est
          invalide ou a expiré. Veuillez en demander un nouveau depuis votre
          profil.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Adresse e-mail confirmée</h2>
      <p>
        Votre nouvelle adresse e-mail a été confirmée avec succès. Vous pouvez
        désormais l&apos;utiliser pour vous connecter.
      </p>
    </div>
  );
}

export default ConfirmEmailChangeForm;
