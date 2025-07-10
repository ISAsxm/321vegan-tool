import { fromToday, buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

const ADDITIVES = [
  {
    id: 1,
    created_at: fromToday(-200, true),
    updated_at: fromToday(-1, true),
    name: "Vert S",
    e_number: "E142",
    description: "",
    status: "V",
    sources: [
      {
        type: "url",
        value: "https://en.wikipedia.org/wiki/E142",
      },
    ],
  },
  {
    id: 2,
    created_at: fromToday(-200, true),
    updated_at: fromToday(-1, true),
    name: "Caramel au sulfite caustique",
    e_number: "E150b",
    description: "Produit par chauffage de sucres en présence de sulfites",
    status: "V",
    sources: [
      {
        type: "url",
        value: "https://en.wikipedia.org/wiki/E150b",
      },
    ],
  },
  {
    id: 3,
    created_at: fromToday(-200, true),
    updated_at: fromToday(-1, true),
    name: "Lysozyme",
    e_number: "E1105",
    description: "Extrait d'œuf de poule",
    status: "C",
    sources: [
      {
        type: "url",
        value: "https://en.wikipedia.org/wiki/E1105",
      },
    ],
  },
  {
    id: 4,
    created_at: fromToday(-20, true),
    updated_at: fromToday(-10, true),
    name: "Sorbate de sodium",
    e_number: "E201",
    description: "",
    status: "V",
    sources: null,
  },
  {
    id: 5,
    created_at: fromToday(-20, true),
    updated_at: fromToday(-10, true),
    name: "Glutamate monosodique",
    e_number: "E621",
    description:
      "Exhausteur de goût produit par fermentation de mélasse, amidon ou betterave avec des bactéries",
    status: "D",
    sources: [
      {
        type: "url",
        value: "https://en.wikipedia.org/wiki/Monosodium_glutamate",
      },
    ],
  },
];

export async function getAdditives() {
  try {
    const res = await axiosInstance.get(`${API_URL}/additives`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load additives. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load additives. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load additives. Error: ${error.message}`);
    }
  }
}

export async function getSearchAdditives({ filters, sortBy, page, size }) {
  const data = await Promise.resolve(ADDITIVES);
  const count = data.length;

  const error = count > 0 ? false : true;
  if (error) {
    console.error(error);
    throw new Error("Additives could not be loaded");
  }
  const params = buildURLSearchParams(filters, sortBy, page, size);

  console.log([`${API_URL}/additives`, params].filter(Boolean).join("?"));

  return { data, count };
}

export async function getAdditive(id) {
  const data = await Promise.resolve(
    ADDITIVES.filter((p) => p.id === Number(id))[0]
  );
  const error = data ? false : true;
  if (error) {
    console.error(error);
    throw new Error("Additive not found");
  }

  return data;
}

export async function createAdditive(additive) {
  const id = ADDITIVES.length + 1;
  const newAdditive = { id: id, ...additive };
  const data = await Promise.resolve(newAdditive);
  const error = data ? false : true;
  if (error) {
    throw new Error(`Additive # ${id} not created`);
  }

  return data;
}

export async function updateAdditive(id, additive) {
  console.log(id, additive);
  const data = await Promise.resolve({ id: id, ...additive });
  const error = data ? false : true;
  if (error) {
    throw new Error(`Additive # ${id} not updated`);
  }

  return data;
}

export async function deleteAdditive(id) {
  const data = await Promise.resolve(
    `Additive # ${id} was successfully deleted`
  );

  const error = data ? false : true;
  if (error) {
    throw new Error(`Additive # ${id} not deleted`);
  }
  return data;
}
