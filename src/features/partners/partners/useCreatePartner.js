import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPartner as createPartnerApi,
  uploadPartnerLogo,
} from "@/services/apiPartners";
import { partnersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreatePartner() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createPartner } = useMutation({
    mutationFn: async ({
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
    }) => {
      let partner = await createPartnerApi({
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
      if (logo_path) {
        partner = await uploadPartnerLogo(partner.id, logo_path);
      }
      return Promise.resolve(partner);
    },
    onSuccess: () => {
      toast.success("L'entreprise partenaire a bien été créée");
      return queryClient.invalidateQueries({
        queryKey: partnersKeys.all(),
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createPartner };
}
