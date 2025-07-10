import { useController, useForm } from "react-hook-form";

import { useUpdateAdditive } from "./useUpdateAdditive";

import { ADDITIVES_STATUSES } from "@/utils/constants";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";
import Spinner from "@/ui/Spinner";

function UpdateAdditiveForm({ additiveToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = additiveToUpdate;
  const { isUpdating, updateAdditive } = useUpdateAdditive();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      sources: additiveToUpdate.sources?.[0]?.value,
    },
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
      }
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
        <Select
          name="status"
          onChange={statusField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[statusField.value]}
          required={true}
          disabled={isUpdating}
          options={Object.entries(ADDITIVES_STATUSES).map(([key, o]) => {
            return { value: key, label: o.label };
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Sources" error={errors.sources?.message}>
        <Input
          type="text"
          id="sources"
          {...register("sources", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
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
