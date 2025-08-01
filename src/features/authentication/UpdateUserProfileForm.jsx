import { useState } from "react";
import { useForm } from "react-hook-form";

import { useUpdateCurrentUser } from "./useUpdateCurrentUser";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

function UpdateUserProfileForm({ user }) {
  const { id, nickname, email } = user;
  const [avatar, setAvatar] = useState("");
  const { isUpdating, updateCurrentUser } = useUpdateCurrentUser();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: { id, nickname, avatar },
  });
  const { errors } = formState;

  function onSubmit(data) {
    updateCurrentUser(
      { ...data, id: id, avatar: avatar },
      {
        onSuccess: (data) => {
          reset({ nickname: data.nickname });
          setAvatar("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Adresse e-mail"
        hint="Information uniquement visible par les administrateurices"
      >
        <Input value={email} disabled />
      </FormRow>

      <FormRow
        label="Pseudo"
        error={errors.nickname?.message}
        hint="Information visible par toustes les utilisateurices"
      >
        <Input
          type="text"
          id="nickname"
          {...register("nickname", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      {/* uncomment when there is a storage solution for files
      <FormRow label="Avatar" hint="Information visible par toustes les utilisateurices">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow> */}

      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={reset}
        >
          Annuler
        </Button>
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserProfileForm;
