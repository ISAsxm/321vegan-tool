import { useController, useForm } from "react-hook-form";

import { useUpdatePartner } from "./useUpdatePartner";
import { useSelectPartnerCategory } from "@/features/partners/categories/useSelectPartnerCategories";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";
import ImageUploader from "@/ui/ImageUploader";
import Checkbox from "@/ui/Checkbox";
import Spinner from "@/ui/Spinner";

function UpdatePartnerForm({ partnerToUpdate, onCloseModal }) {
  const { id: updateId, ...updateValues } = partnerToUpdate;
  const { isPending, partnerCategories } = useSelectPartnerCategory();

  const { isUpdating, updatePartner } = useUpdatePartner();
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ...updateValues,
      category_id: partnerToUpdate.category?.id || null,
    },
  });
  const { errors } = formState;

  const { field: categoryField } = useController({
    name: "category_id",
    control,
    defaultValue: null,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: logoField } = useController({
    name: "logo_path",
    control,
    rules: { required: "Ce champ est obligatoire" },
  });

  const { field: isAffiliateField } = useController({
    name: "is_affiliate",
    control,
    defaultValue: partnerToUpdate.is_affiliate,
  });
  const { field: showCodeField } = useController({
    name: "show_code_in_website",
    control,
    defaultValue: partnerToUpdate.show_code_in_website,
  });
  const { field: isActiveField } = useController({
    name: "is_active",
    control,
    defaultValue: partnerToUpdate.is_active,
  });

  function onSubmit(data) {
    updatePartner(
      { newData: data, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  if (isUpdating || isPending) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Catégorie" error={errors.category_id?.message}>
        <Select
          name="category_id"
          onChange={categoryField.onChange}
          defaultValue={[categoryField.value]}
          defaultOptions={partnerCategories}
          disabled={isUpdating}
          isSearchable={true}
          isNullable={false}
          required
        />
      </FormRow>

      <FormRow label="Raison sociale" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow
        label="Description de l'entreprise"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", { required: "Ce champ est obligatoire" })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Site web" error={errors.url?.message}>
        <Input
          type="text"
          id="url"
          {...register("url", {
            pattern: {
              value: /^(http(s)?:\/\/)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
              message: "URL invalide",
            },
            required: "Ce champ est obligatoire",
          })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Logo" error={errors.logo_path?.message}>
        <ImageUploader
          id="logo_path"
          onUpload={logoField.onChange}
          disabled={isUpdating}
          defaultValue={logoField.value}
          required={!logoField.value}
        />
      </FormRow>

      <FormRow label="Réduction accordée" error={errors.discount_text?.message}>
        <Input
          type="text"
          id="discount_text"
          {...register("discount_text", {
            required: "Ce champ est obligatoire",
          })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Code promo" error={errors.discount_code?.message}>
        <Input
          type="text"
          id="discount_code"
          {...register("discount_code", {
            required: "Ce champ est obligatoire",
          })}
          disabled={isUpdating}
          required
        />
      </FormRow>

      <FormRow label="Code affilié ?" error={errors.is_affiliate?.message}>
        <Checkbox
          name="is_affiliate"
          onChange={isAffiliateField.onChange}
          onBlur={isAffiliateField.onBlur}
          checked={isAffiliateField.value}
          value={isAffiliateField.value}
          $inputRef={isAffiliateField.ref}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow
        label="Code affiché dans le site web ?"
        error={errors.show_code_in_website?.message}
      >
        <Checkbox
          name="show_code_in_website"
          onChange={showCodeField.onChange}
          onBlur={showCodeField.onBlur}
          checked={showCodeField.value}
          value={showCodeField.value}
          $inputRef={showCodeField.ref}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Code actif ?" error={errors.is_active?.message}>
        <Checkbox
          name="is_active"
          onChange={isActiveField.onChange}
          onBlur={isActiveField.onBlur}
          checked={isActiveField.value}
          value={isActiveField.value}
          $inputRef={isActiveField.ref}
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
        <Button disabled={isUpdating}>Modifier</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePartnerForm;
