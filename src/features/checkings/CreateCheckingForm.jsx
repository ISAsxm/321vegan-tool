import { useForm } from "react-hook-form";

import { useCreateChecking } from "./useCreateChecking";
import { useUpdateProduct } from "@/features/products/useUpdateProduct";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";

function CreateCheckingForm({ product, onCloseModal }) {
  const { isCreating, createChecking } = useCreateChecking();
  const { isUpdating, updateProduct } = useUpdateProduct();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const isPending = isCreating || isUpdating;

  function onSubmit(data) {
    createChecking(
      {
        ...data,
        product_id: product.id,
        response: product.problem_description,
      },
      {
        onSuccess: () => {
          updateProduct(
            {
              newData: { ...product, state: "WAITING_BRAND_REPLY" },
              id: product.id,
            },
            {
              onSuccess: () => {
                reset();
                onCloseModal?.();
              },
            }
          );
        },
      }
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow
        label="Date de la prise de contact"
        error={errors.requested_on?.message}
      >
        <Input
          id="requested_on"
          type="datetime-local"
          {...register("requested_on", {
            valueAsDate: true,
            required: "Ce champ est obligatoire",
          })}
          defaultValue={new Date().toISOString().substring(0, 16)}
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

export default CreateCheckingForm;
