import { useController, useForm } from "react-hook-form";

import { useUpdateAdditive } from "./useUpdateAdditive";

import { ADDITIVES_STATUSES } from "@/utils/constants";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Radios from "@/ui/Radios";

function UpdateAdditiveForm({ additiveToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = additiveToUpdate;
  const { isUpdating, updateAdditive } = useUpdateAdditive();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: updateValues,
  });
  const { errors } = formState;

  const { field: statusField } = useController({
    name: "status",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  function onSubmit(data) {
    updateAdditive(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
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
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Statut" error={errors.status?.message}>
        <Radios
          id="status"
          onChange={statusField.onChange}
          defaultValue={statusField.value}
          required={true}
        >
          {Object.entries(ADDITIVES_STATUSES).map(([key, o]) => (
            <Radios.RadioButton
              key={key}
              value={key}
              color={o.color}
              disabled={isUpdating}
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
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Source" error={errors.source?.message}>
        <Input
          type="text"
          id="source"
          {...register("source")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isUpdating}
        >
          Annuler
        </Button>
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateAdditiveForm;
