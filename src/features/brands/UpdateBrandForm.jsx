import { useController, useForm } from "react-hook-form";

import { getBrandsForSelect } from "@/services/apiBrands";
import { useUpdateBrand } from "./useUpdateBrand";
import BrandLogoManager from "./BrandLogoManager";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Select from "@/ui/Select";

import Spinner from "@/ui/Spinner";

function UpdateBrandForm({ brandToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = brandToUpdate;
  const { isUpdating, updateBrand } = useUpdateBrand();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      parent_id: brandToUpdate.parent?.id || null,
      logo_path: brandToUpdate.logo_path || null,
    },
  });
  const { errors } = formState;

  const { field: parentField } = useController({
    name: "parent_id",
    control,
  });

  function onSubmit(data) {
    const updateData = {
      ...data,
      logo_path: brandToUpdate.logo_path || null,
    };
    
    updateBrand(
      { newData: updateData, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  if (isUpdating) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Maison mère" error={errors.parent_id?.message}>
        <Select
          name="parent_id"
          onChange={parentField.onChange}
          getOptions={getBrandsForSelect}
          defaultValue={[parentField.value]}
          defaultOptions={
            brandToUpdate.parent
              ? [
                  {
                    value: brandToUpdate.parent.id,
                    label: brandToUpdate.parent.name,
                  },
                ]
              : []
          }
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Nom" error={errors.name?.message} htmlFor="name">
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
        />
      </FormRow>

        {/* Hidden input to preserve logo_path in form data */}
        <input
          type="hidden"
          {...register("logo_path")}
        />
      <FormRow label="Logo" htmlFor="brand-logo">
        <BrandLogoManager 
          brand={brandToUpdate}
          disabled={isUpdating}
          id="brand-logo"
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
        <Button disabled={isUpdating}>
          Modifier
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateBrandForm;
