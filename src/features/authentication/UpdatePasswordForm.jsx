import { useForm } from "react-hook-form";

import { useUpdateCurrentUser } from "./useUpdateCurrentUser";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import PasswordInput from "@/ui/PasswordInput";

function UpdatePasswordForm({ user }) {
  const { isUpdating, updateCurrentUser } = useUpdateCurrentUser();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ password }) {
    updateCurrentUser(
      { id: user.id, password: password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Nouveau mot de passe (min 8 caractères)"
        error={errors?.password?.message}
      >
        <PasswordInput
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          required
          {...register("password", {
            required: "Ce champ est obligatoire",
            minLength: {
              value: 8,
              message: "Le mot de passe doit comporter au moins 8 caractères",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirmation du nouveau mot de passe"
        error={errors?.passwordConfirm?.message}
      >
        <PasswordInput
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          required
          {...register("passwordConfirm", {
            required: "Ce champ est obligatoire",
            validate: (value) =>
              getValues().password === value ||
              "Les mots de passe doivent correspondre",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Annuler
        </Button>
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
