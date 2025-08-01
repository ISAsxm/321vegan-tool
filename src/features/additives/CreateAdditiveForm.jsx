import { useController, useForm } from "react-hook-form";

import { ADDITIVES_STATUSES } from "@/utils/constants";
import { useCreateAdditive } from "./useCreateAdditive";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";

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
        <Select
          name="status"
          onChange={statusField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[]}
          required={true}
          disabled={isCreating}
          defaultOptions={Object.entries(ADDITIVES_STATUSES).map(([key, o]) => {
            return { value: key, label: o.label };
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Sources" error={errors.sources?.message}>
        <Input
          type="text"
          id="sources"
          {...register("sources", { required: "Ce champ est obligatoire" })}
          disabled={isCreating}
          required
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
