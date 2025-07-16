import { useForm } from "react-hook-form";

import { useLogin } from "./useLogin";

import Form from "@/ui/Form";
import FormCol from "@/ui/FormCol";
import Input from "@/ui/Input";
import PasswordInput from "@/ui/PasswordInput";
import Button from "@/ui/Button";
import SpinnerMini from "@/ui/SpinnerMini";

function LoginForm() {
  const { isPending, login } = useLogin();

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    login(data, {
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
          autoComplete="username"
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

      <FormCol label="Mot de passe" error={errors.password?.message}>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Ce champ est obligatoire",
          })}
          disabled={isPending}
          required
        />
      </FormCol>

      <FormCol>
        <Button size="large" disabled={isPending}>
          {!isPending ? "Me connecter" : <SpinnerMini />}
        </Button>
      </FormCol>
    </Form>
  );
}

export default LoginForm;
