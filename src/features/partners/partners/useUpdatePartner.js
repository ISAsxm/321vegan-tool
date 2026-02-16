import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updatePartner as updatePartnerApi,
  uploadPartnerLogo,
  deletePartnerLogo,
} from "@/services/apiPartners";
import { partnersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdatePartner() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updatePartner } = useMutation({
    mutationFn: async ({ id, newData }) => {
      const {
        category_id,
        name,
        logo_path,
        url,
        description,
        discount_text,
        discount_code,
        is_affiliate,
        show_code_in_website,
        is_active,
      } = newData;
      if (typeof logo_path === "string" || logo_path instanceof String) {
        return await updatePartnerApi(id, {
          category_id: category_id,
          name: name,
          url: url,
          description: description,
          discount_text: discount_text,
          discount_code: discount_code,
          is_affiliate: is_affiliate,
          show_code_in_website: show_code_in_website,
          is_active: is_active,
        });
      } else {
        return Promise.all([
          updatePartnerApi(id, {
            category_id: category_id,
            name: name,
            url: url,
            description: description,
            discount_text: discount_text,
            discount_code: discount_code,
            is_affiliate: is_affiliate,
            show_code_in_website: show_code_in_website,
            is_active: is_active,
          }),
          logo_path ? uploadPartnerLogo(id, logo_path) : deletePartnerLogo(id),
        ]);
      }
    },
    onSuccess: () => {
      toast.success("L'entreprise partenaire a bien été modifiée");
      return queryClient.invalidateQueries({
        queryKey: partnersKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updatePartner };
}
