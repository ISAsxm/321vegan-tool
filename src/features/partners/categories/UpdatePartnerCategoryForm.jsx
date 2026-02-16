import { useForm } from "react-hook-form";

import { useUpdatePartnerCategory } from "./useUpdatePartnerCategory";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";

function UpdatePartnerCategoryForm({ partnerCategoryToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = partnerCategoryToUpdate;
  const { isUpdating, updatePartnerCategory } = useUpdatePartnerCategory();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      ...updateValues,
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    updatePartnerCategory(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  if (isUpdating) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nom" error={errors.name?.message} htmlFor="name">
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
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

export default UpdatePartnerCategoryForm;
