import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";

import { PRODUCT_STATUSES, PRODUCT_STATES } from "@/utils/constants";
import { getBrandsForSelect } from "@/services/apiBrands";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useUpdateProduct } from "./useUpdateProduct";
import { useDeleteProduct } from "./useDeleteProduct";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Select from "@/ui/Select";
import Checkbox from "@/ui/Checkbox";
import Radios from "@/ui/Radios";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import Spinner from "@/ui/Spinner";
import CreateBrandForm from "@/features/brands/CreateBrandForm";
import styled from "styled-components";

function RegisterProductForm({ productToCheckedIn, onClose }) {
  const { id: checkedId, ...checkedInValues } = productToCheckedIn;
  const { isUpdating, updateProduct } = useUpdateProduct();
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { hasAccess } = useCurrentUserContext();

  const { register, formState, handleSubmit, reset, control, watch, setValue } =
    useForm({
      defaultValues: {
        ...checkedInValues,
        brand_id: productToCheckedIn.brand?.id || null,
      },
    });
  const { errors } = formState;

  const isPending = isUpdating || isDeleting;

  const watchFields = watch(["state", "status", "problem_description"]);
  const { field: brandField } = useController({
    name: "brand_id",
    control,
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
    defaultValue: checkedInValues.biodynamic,
  });

  // Show problems field only for MAYBE_VEGAN or NON_VEGAN status
  const shouldShowProblemsField = ["MAYBE_VEGAN", "NON_VEGAN"].includes(
    watchFields[1]
  );
  // Check if status should be locked when state is NEED_CONTACT
  const isStatusLocked = watchFields[0] === "NEED_CONTACT";

  const [problemDescription, setProblemDescription] = useState("");

  const [ingredients, setIngredients] = useState({
    lait: false,
    oeuf: false,
    miel: false,
    viande: false,
  });

  const IngredientLabel = styled.label`
    cursor: pointer;
    display: inline-block;
    padding: 6px 12px;
    border-radius: 0.5em;
    border: 1px solid #ccc;
    user-select: none;
    background-color: ${({ checked }) => (checked ? "#e0e0e0" : "#f9f9f9")};
  `;

  // Auto-set status to MAYBE_VEGAN when state is NEED_CONTACT
  useEffect(() => {
    if (watchFields[0] === "NEED_CONTACT" && watchFields[1] !== "MAYBE_VEGAN") {
      setValue("status", "MAYBE_VEGAN");
    }
  }, [watchFields, setValue]);

  function onSubmit(data) {
    if (!shouldShowProblemsField) {
      data.problem_description = null;
    }
    updateProduct(
      { newData: data, id: checkedId },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      }
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Form type={"regular"}>
      <FormRow label="État" error={errors.state?.message}>
        <Radios
          id="state"
          onChange={stateField.onChange}
          defaultValue={watchFields[0]}
          required={true}
        >
          {Object.entries(PRODUCT_STATES).map(([key, o]) => (
            <Radios.RadioButton
              key={key}
              value={key}
              color={o.color}
              disabled={isPending || !hasAccess(o.role)}
            >
              {o.label}
            </Radios.RadioButton>
          ))}
        </Radios>
      </FormRow>

      <FormRow label="Statut" error={errors.status?.message}>
        <Radios
          id="status"
          onChange={statusField.onChange}
          defaultValue={watchFields[1]}
          required={true}
        >
          {Object.entries(PRODUCT_STATUSES).map(([key, o]) => (
            <Radios.RadioButton
              key={key}
              value={key}
              color={o.color}
              disabled={isPending || (isStatusLocked && key !== "MAYBE_VEGAN")}
            >
              {o.label}
            </Radios.RadioButton>
          ))}
        </Radios>
      </FormRow>

      <FormRow label="Marque" error={errors.brand_id?.message}>
        <Select
          name="brand_id"
          onChange={brandField.onChange}
          getOptions={getBrandsForSelect}
          defaultOptions={
            productToCheckedIn.brand
              ? [
                  {
                    value: productToCheckedIn.brand.id,
                    label: productToCheckedIn.brand.name,
                  },
                ]
              : []
          }
          defaultValue={[brandField.value]}
          disabled={isUpdating}
          createComponent={
            <CreateBrandForm prefillName={productToCheckedIn.brandName} />
          }
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

      <FormRow label="Nom" error={errors.name?.message}>
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

      {shouldShowProblemsField && (
        <>
          <FormRow
            label="Problèmes"
            hint="Raison pour laquelle le produit n'est pas vegan"
            error={errors.problem_description?.message}
          >
            <Textarea
              id="problem_description"
              {...register("problem_description", {
                required:
                  "Ce champ est obligatoire lorsque le status est 'MAYBE VEGAN' ou 'NON VEGAN'",
                validate: (value) =>
                  shouldShowProblemsField && !value ? false : true,
              })}
              disabled={isPending}
              required
            />
          </FormRow>

          <FormRow label="Ingrédients">
            <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
              {Object.keys(ingredients).map((item) => (
                <IngredientLabel key={item} checked={ingredients[item]}>
                  <input
                    type="checkbox"
                    checked={ingredients[item]}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      // Update ingredient state
                      setIngredients((prev) => ({
                        ...prev,
                        [item]: checked,
                      }));

                      // Update problemDescription values array
                     let valuesArray = (watchFields[2] || "")
                        .split(/[ ,;]+/)
                        .map((v) => v.trim())
                        .filter((v) => v);

                      if (checked && !valuesArray.includes(item)) {
                        valuesArray.push(item);
                      } else if (!checked && valuesArray.includes(item)) {
                        valuesArray = valuesArray.filter((val) => val !== item);
                      }

                      // Update problemDescription string
                      setValue("problem_description", valuesArray.join(" "));
                    }}
                    style={{ display: "none" }}
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </IngredientLabel>
              ))}
            </div>
          </FormRow>
        </>
      )}

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
          onClick={() => onClose()}
          disabled={isPending}
        >
          Annuler
        </Button>
        {hasAccess("contributor") && (
          <Modal>
            <Modal.Open opens="delete">
              <Button $variation="danger" disabled={isPending} type="button">
                Supprimer
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmAction
                variation="delete"
                title="Supprimer un produit"
                message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement ce produit ?"
                onConfirm={() =>
                  deleteProduct(checkedId, {
                    onSettled: () => onClose(),
                  })
                }
                disabled={isPending}
              />
            </Modal.Window>
          </Modal>
        )}
        <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </Button>
      </FormRow>
    </Form>
  );
}

export default RegisterProductForm;
