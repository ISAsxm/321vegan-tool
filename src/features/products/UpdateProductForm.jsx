import { useController, useForm } from "react-hook-form";

import { PRODUCT_STATUSES, PRODUCT_STATES } from "@/utils/constants";
import { getBrandsForSelect } from "@/services/apiBrands";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import { useUpdateProduct } from "./useUpdateProduct";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";
import SelectRelationship from "@/ui/SelectRelationship";
import Checkbox from "@/ui/Checkbox";
import Spinner from "@/ui/Spinner";

import CreateBrandForm from "@/features/brands/CreateBrandForm";

function UpdateProductForm({ productToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = productToUpdate;
  const { isUpdating, updateProduct } = useUpdateProduct();
  const { isPending: isPendingUser, userRoles } = useCurrentUser();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      brand_id: productToUpdate.brand?.id || null,
    },
  });
  const { errors } = formState;

  const { field: brandField } = useController({
    name: "brand_id",
    control,
    defaultValue: productToUpdate.brand?.id || null,
  });
  const { field: stateField } = useController({
    name: "state",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });
  const { field: statusField } = useController({
    name: "status",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });
  const { field: isByodinamicField } = useController({
    name: "biodynamic",
    control,
    defaultValue: updateValues.biodynamic,
  });

  function onSubmit(data) {
    updateProduct(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  if (isPendingUser) return <Spinner />;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="État" error={errors.state?.message}>
        <Select
          name="state"
          onChange={stateField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[stateField.value]}
          required={true}
          disabled={isUpdating}
          options={Object.entries(PRODUCT_STATES).map(([key, o]) => {
            return {
              value: key,
              label: o.label,
              disabled: userRoles.includes(o.role) ? false : true,
            };
          })}
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
          options={Object.entries(PRODUCT_STATUSES).map(([key, o]) => {
            return { value: key, label: o.label };
          })}
        />
      </FormRow>
      <FormRow label="Marque" error={errors.brand_id?.message}>
        <SelectRelationship
          name="brand_id"
          onChange={brandField.onChange}
          isMulti={false}
          defaultOptions={
            productToUpdate.brand
              ? [
                  {
                    value: productToUpdate.brand.id,
                    label: productToUpdate.brand.name,
                  },
                ]
              : []
          }
          defaultValue={[brandField.value]}
          getOptions={getBrandsForSelect}
          required={false}
          disabled={isUpdating}
          createComponent={<CreateBrandForm />}
        />
      </FormRow>

      <FormRow label="EAN" error={errors.ean?.message}>
        <Input
          type="text"
          id="ean"
          {...register("ean", { required: "Ce champ est obligatoire" })}
          disabled={true}
          readOnly={true}
          required
        />
      </FormRow>

      <FormRow label="Dénomination" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Problèmes" error={errors.problem_description?.message}>
        <Textarea
          id="problem_description"
          {...register("problem_description")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Biodynamie ?" error={errors.biodynamic?.message}>
        <Checkbox
          name="biodynamic"
          onChange={isByodinamicField.onChange}
          onBlur={isByodinamicField.onBlur}
          checked={isByodinamicField.value}
          value={isByodinamicField.value}
          $inputRef={isByodinamicField.ref}
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
        <Button disabled={isUpdating} onClick={handleSubmit(onSubmit)}>
          Modifier
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateProductForm;
