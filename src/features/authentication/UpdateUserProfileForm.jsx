import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { USER_AVATARS } from "@/utils/constants";
import { useUpdateCurrentUser } from "./useUpdateCurrentUser";

import Button from "@/ui/Button";
import Radios from "@/ui/Radios";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

import { StyledUserAvatar, Avatar } from "@/features/authentication/UserAvatar";

function UpdateUserProfileForm({ user }) {
  const { id, nickname, email, avatar } = user;
  const { isUpdating, updateCurrentUser } = useUpdateCurrentUser();
  const { register, formState, handleSubmit, reset, watch, setValue, control } =
    useForm({
      defaultValues: { id, nickname, avatar: avatar || USER_AVATARS.default },
    });
  const { errors } = formState;

  const watchFields = watch(["avatar"]);

  const { field: avatarField } = useController({
    name: "avatar",
    control,
  });

  useEffect(() => {
    if (watchFields[0] === USER_AVATARS.default) {
      setValue("avatar", "");
    }
  }, [watchFields, setValue]);

  function onSubmit(data) {
    updateCurrentUser(
      { ...data, id: id },
      {
        onSuccess: (data) => {
          reset({
            nickname: data.nickname,
            avatar: data.avatar || USER_AVATARS.default,
          });
        },
      },
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

      <FormRow
        label="Avatar"
        hint="Information visible par toustes les utilisateurices"
        error={errors.avatar?.message}
      >
        <Radios
          id="avatar"
          onChange={avatarField.onChange}
          defaultValue={watchFields[0]}
          required={false}
          wrap={"wrap"}
        >
          {Object.entries(USER_AVATARS).map(([key, o]) => (
            <Radios.RadioButton
              key={key}
              value={key === "default" ? "" : o}
              disabled={isUpdating}
              $size="large"
            >
              <StyledUserAvatar>
                <Avatar src={o} alt="" />
              </StyledUserAvatar>
            </Radios.RadioButton>
          ))}
        </Radios>
      </FormRow>

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
