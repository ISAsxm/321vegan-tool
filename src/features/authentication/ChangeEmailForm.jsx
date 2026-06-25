import { useForm } from "react-hook-form";

import { useRequestEmailChange } from "./useEmailChange";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import PasswordInput from "@/ui/PasswordInput";

function ChangeEmailForm({ user }) {
  const { isPending, requestEmailChange } = useRequestEmailChange();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ new_email, current_password }) {
    requestEmailChange(
      { new_email, current_password },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Adresse e-mail actuelle"
        hint="Information uniquement visible par les administrateurices"
      >
        <Input value={user.email} disabled />
      </FormRow>

      <FormRow
        label="Nouvelle adresse e-mail"
        error={errors?.new_email?.message}
        hint="Un lien de confirmation sera envoyé à cette adresse"
      >
        <Input
          type="email"
          id="new_email"
          autoComplete="email"
          disabled={isPending}
          required
          {...register("new_email", {
            required: "Ce champ est obligatoire",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Adresse e-mail invalide",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Mot de passe actuel"
        error={errors?.current_password?.message}
      >
        <PasswordInput
          id="current_password"
          autoComplete="current-password"
          disabled={isPending}
          required
          {...register("current_password", {
            required: "Ce champ est obligatoire",
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Annuler
        </Button>
        <Button disabled={isPending} type="submit">
          Modifier
        </Button>
      </FormRow>
    </Form>
  );
}

export default ChangeEmailForm;
