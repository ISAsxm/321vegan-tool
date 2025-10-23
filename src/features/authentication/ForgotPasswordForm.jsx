import { useForm } from "react-hook-form";
import { useRequestPasswordReset } from "./useRequestPasswordReset";

import Form from "@/ui/Form";
import FormCol from "@/ui/FormCol";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import SpinnerMini from "@/ui/SpinnerMini";

function ForgotPasswordForm() {
  const { isPending, requestPasswordReset } = useRequestPasswordReset();

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    requestPasswordReset(data.email, {
      onSettled: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormCol label="Adresse e-mail" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          {...register("email", {
            required: "Ce champ est obligatoire",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Adresse e-mail invalide",
            },
          })}
          disabled={isPending}
          required
        />
      </FormCol>

      <FormCol>
        <Button size="large" disabled={isPending}>
          {!isPending ? "Envoyer le lien de réinitialisation" : <SpinnerMini />}
        </Button>
      </FormCol>
    </Form>
  );
}

export default ForgotPasswordForm;