import { useController, useForm } from "react-hook-form";

import { useCreateApiClient } from "./useCreateApiClient";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Checkbox from "@/ui/Checkbox";

function CreateApiClient({ onCloseModal }) {
  const { isCreating, createApiClient } = useCreateApiClient();
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { errors } = formState;

  const { field: isActiveField } = useController({
    name: "is_active",
    control,
    defaultValue: true,
  });

  function onSubmit(data) {
    createApiClient(data, {
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
      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Clé d'API" error={errors.api_key?.message}>
        <Input
          type="text"
          id="api_key"
          {...register("api_key", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Accès actif ?" error={errors.is_active?.message}>
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

export default CreateApiClient;
