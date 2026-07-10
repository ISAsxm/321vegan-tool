import { useForm } from "react-hook-form";

import { useUpdateErrorReport } from "./useUpdateErrorReport";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Textarea from "@/ui/Textarea";
import Heading from "@/ui/Heading";

function HandleErrorReportForm({ errorReport, onCloseModal }) {
  const { isUpdating, updateErrorReport } = useUpdateErrorReport();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: { response: errorReport.response || "" },
  });
  const { errors } = formState;

  function onSubmit(data) {
    updateErrorReport(
      {
        id: errorReport.id,
        newData: {
          ...errorReport,
          handled: true,
          response: data.response || null,
        },
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading as="h3">Marquer comme traité</Heading>

      <FormRow
        label="Réponse"
        error={errors.response?.message}
        htmlFor="response"
      >
        <Textarea id="response" {...register("response")} disabled={isUpdating} />
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
        <Button $variation="confirm" disabled={isUpdating}>
          Valider
        </Button>
      </FormRow>
    </Form>
  );
}

export default HandleErrorReportForm;
