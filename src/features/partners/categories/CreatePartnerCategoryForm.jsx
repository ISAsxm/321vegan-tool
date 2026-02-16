import { useForm } from "react-hook-form";
import { useCreatePartnerCategory } from "./useCreatePartnerCategory";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";

function CreatePartnerCategoryForm({ onCloseModal }) {
  const { isCreating, createPartnerCategory } = useCreatePartnerCategory();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      parent_category_id: null,
      name: null,
      image: null,
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    createPartnerCategory(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  if (isCreating) return <Spinner />;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Nom" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
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
        <Button disabled={isCreating} onClick={handleSubmit(onSubmit)}>
          Créer
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreatePartnerCategoryForm;
