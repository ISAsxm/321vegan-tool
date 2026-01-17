import { useController, useForm } from "react-hook-form";

import { ADDITIVES_STATUSES } from "@/utils/constants";
import { useCreateAdditive } from "./useCreateAdditive";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Radios from "@/ui/Radios";

function CreateAdditiveForm({ onCloseModal }) {
  const { isCreating, createAdditive } = useCreateAdditive();
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { errors } = formState;

  const { field: statusField } = useController({
    name: "status",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  function onSubmit(data) {
    createAdditive(data, {
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
      <FormRow label="E Code" error={errors.e_number?.message}>
        <Input
          type="text"
          id="e_number"
          {...register("e_number", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
        />
      </FormRow>

      <FormRow label="Statut" error={errors.status?.message}>
        <Radios id="status" onChange={statusField.onChange} required={true}>
          {Object.entries(ADDITIVES_STATUSES).map(([key, o]) => (
            <Radios.RadioButton
              key={key}
              value={key}
              color={o.color}
              disabled={isCreating}
            >
              {o.label}
            </Radios.RadioButton>
          ))}
        </Radios>
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Source" error={errors.source?.message}>
        <Input
          type="text"
          id="source"
          {...register("source")}
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

export default CreateAdditiveForm;
