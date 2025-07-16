import { useController, useForm } from "react-hook-form";
import { useBrandsForSelect } from "./useBrandsForSelect";
import { useCreateBrand } from "./useCreateBrand";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Spinner from "@/ui/Spinner";

function CreateBrandForm({ prefillName, onCloseModal, onSuccessAction }) {
  const { isCreating, createBrand } = useCreateBrand();
  const { isPending: brandisPending, brands } = useBrandsForSelect();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      parent_id: null,
      name: prefillName || null,
    },
  });
  const { errors } = formState;
  const isPending = isCreating || brandisPending;

  const { field: parentField } = useController({
    name: "parent_id",
    control,
  });

  function onSubmit(data) {
    createBrand(data, {
      onSuccess: (data) => {
        reset();
        onCloseModal?.();
        onSuccessAction?.(data);
      },
    });
  }

  if (isPending) return <Spinner />;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Maison mère" error={errors.parent_id?.message}>
        <Select
          name="parent_id"
          onChange={parentField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[]}
          required={false}
          disabled={isPending}
          options={brands || []}
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isPending}
          required
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isPending}
        >
          Annuler
        </Button>
        <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>
          Créer
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBrandForm;
