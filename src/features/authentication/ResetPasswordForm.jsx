import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useVerifyPasswordResetToken, useConfirmPasswordReset } from "./usePasswordReset";

import Form from "@/ui/Form";
import FormCol from "@/ui/FormCol";
import PasswordInput from "@/ui/PasswordInput";
import Button from "@/ui/Button";
import SpinnerMini from "@/ui/SpinnerMini";
import Spinner from "@/ui/Spinner";

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [verificationEnabled, setVerificationEnabled] = useState(true);

  const { isLoading: isVerifying, error: tokenError, isValidToken } = useVerifyPasswordResetToken(token, verificationEnabled);
  const { confirmPasswordReset, isPending } = useConfirmPasswordReset(token);
  
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    setVerificationEnabled(false);
    confirmPasswordReset(
      { token, new_password: data.password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  if (isVerifying) {
    return <Spinner />;
  }

  if (tokenError || !isValidToken) {
    return (
      <div>
        <h2>Lien invalide ou expiré</h2>
        <p>Le lien de réinitialisation du mot de passe est invalide ou a expiré. Veuillez demander un nouveau lien.</p>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormCol label="Nouveau mot de passe" error={errors.password?.message}>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          {...register("password", {
            required: "Ce champ est obligatoire",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              message: "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial",
            },
          })}
          disabled={isPending}
          required
        />
      </FormCol>

      <FormCol label="Confirmer le nouveau mot de passe" error={errors.passwordConfirm?.message}>
        <PasswordInput
          id="passwordConfirm"
          autoComplete="new-password"
          {...register("passwordConfirm", {
            required: "Ce champ est obligatoire",
            validate: (value) =>
              value === getValues().password || "Les mots de passe ne correspondent pas",
          })}
          disabled={isPending}
          required
        />
      </FormCol>

      <FormCol>
        <Button size="large" disabled={isPending}>
          {!isPending ? "Réinitialiser le mot de passe" : <SpinnerMini />}
        </Button>
      </FormCol>
    </Form>
  );
}

export default ResetPasswordForm;