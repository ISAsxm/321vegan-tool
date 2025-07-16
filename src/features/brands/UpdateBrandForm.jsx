import { useController, useForm } from "react-hook-form";

import { useBrandsForSelect } from "./useBrandsForSelect";
import { useUpdateBrand } from "./useUpdateBrand";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";

import Spinner from "@/ui/Spinner";

function UpdateBrandForm({ brandToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = brandToUpdate;
  const { isPending: isPendingBrands, brands } = useBrandsForSelect();
  const { isUpdating, updateBrand } = useUpdateBrand();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      parent_id: brandToUpdate.parent?.id || null,
    },
  });
  const { errors } = formState;
  const isPending = isUpdating || isPendingBrands;

  const { field: parentField } = useController({
    name: "parent_id",
    control,
  });

  function onSubmit(data) {
    updateBrand(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Maison mère" error={errors.parent_id?.message}>
        <Select
          name="parent_id"
          onChange={parentField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[parentField.value]}
          required={false}
          disabled={isPending}
          options={
            brands?.map((b) => {
              return {
                value: b.value,
                label: b.label,
                disabled: b.value === updateId ? true : false,
              };
            }) || []
          }
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
        <Button disabled={isPending}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateBrandForm;
