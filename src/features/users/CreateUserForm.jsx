import { useController, useForm } from "react-hook-form";
import { USER_ROLES } from "@/utils/constants";

import { useCreateUser } from "./useCreateUser";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import PasswordInput from "@/ui/PasswordInput";
import Checkbox from "@/ui/Checkbox";

function CreateUserForm({ onCloseModal }) {
  const { isCreating, createUser } = useCreateUser();
  const { register, formState, getValues, handleSubmit, reset, control } =
    useForm();
  const { errors } = formState;

  const { field: roleField } = useController({
    name: "role",
    control,
    defaultValue: "user",
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: isActiveField } = useController({
    name: "is_active",
    control,
    defaultValue: true,
  });

  function onSubmit(data) {
    createUser(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Rôle" error={errors.role?.message}>
        <Select
          name="role"
          onChange={roleField.onChange}
          isSearchable={true}
          defaultValue={[roleField.value]}
          defaultOptions={Object.entries(USER_ROLES).map(([key, o]) => {
            return { value: key, label: o.label };
          })}
          required={true}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Pseudo" error={errors.nickname?.message}>
        <Input
          type="text"
          id="nickname"
          {...register("nickname", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Adresse e-mail" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Ce champ est obligatoire",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Adresse e-mail invalide",
            },
          })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow
        label="Mot de passe (min 8 caractères)"
        error={errors.password?.message}
      >
        <PasswordInput
          id="password"
          {...register("password", {
            required: "Ce champ est obligatoire",
            minLength: {
              value: 8,
              message: "Le mot de passe doit comporter au moins 8 caractères",
            },
          })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow
        label="Confirmation du mot de passe"
        error={errors.passwordConfirm?.message}
      >
        <PasswordInput
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Ce champ est obligatoire",
            validate: (value) => {
              value === getValues().password ||
                "Les mots de passe doivent correspondre";
            },
          })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Compte actif ?" error={errors.is_active?.message}>
        <Checkbox
          name="is_active"
          onChange={isActiveField.onChange}
          onBlur={isActiveField.onBlur}
          checked={isActiveField.value}
          value={isActiveField.value}
          $inputRef={isActiveField.ref}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Annuler
        </Button>
        <Button disabled={isCreating}>Créer</Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
