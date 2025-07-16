import { useController, useForm } from "react-hook-form";

import { PRODUCT_STATUSES, PRODUCT_STATES } from "@/utils/constants";
import { useBrandsForSelect } from "@/features/brands/useBrandsForSelect";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import { useCreateProduct } from "./useCreateProduct";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";
import Checkbox from "@/ui/Checkbox";
import Spinner from "@/ui/Spinner";

import CreateBrandForm from "@/features/brands/CreateBrandForm";

function CreateProductForm({ onCloseModal }) {
  const { isCreating, createProduct } = useCreateProduct();
  const { isPending: brandisPending, brands } = useBrandsForSelect();
  const { isPending: isPendingUser, userRoles } = useCurrentUser();
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { errors } = formState;

  const isPending = isCreating || brandisPending || isPendingUser;

  const { field: brandField } = useController({
    name: "brand_id",
    control,
    defaultValue: null,
  });
  const { field: stateField } = useController({
    name: "state",
    control,
    defaultValue: Object.keys(PRODUCT_STATES)[0],
    rules: { required: "Ce champ est obligatoire" },
  });
  const { field: statusField } = useController({
    name: "status",
    control,
    defaultValue: Object.keys(PRODUCT_STATUSES)[0],
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: isByodinamicField } = useController({
    name: "biodynamic",
    control,
    defaultValue: false,
  });

  function onSubmit(data) {
    createProduct(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  if (isPending) return <Spinner />;

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
          disabled={isPending}
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
          disabled={isPending}
          options={Object.entries(PRODUCT_STATUSES).map(([key, o]) => {
            return { value: key, label: o.label };
          })}
        />
      </FormRow>

      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={brandField.onChange}
          isMulti={false}
          isSearchable={true}
          defaultValue={[brandField.value]}
          required={false}
          disabled={isPending}
          options={brands || []}
          createComponent={<CreateBrandForm />}
        />
      </FormRow>

      <FormRow label="EAN" error={errors.ean?.message}>
        <Input
          type="text"
          id="ean"
          {...register("ean", { required: "Ce champ est obligatoire" })}
          disabled={isPending}
          required
        />
      </FormRow>

      <FormRow label="Dénomination" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Problèmes" error={errors.problem_description?.message}>
        <Textarea
          id="problem_description"
          {...register("problem_description")}
          disabled={isPending}
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
          disabled={isPending}
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

export default CreateProductForm;
