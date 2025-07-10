import { fromToday, buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

const COSMETICS = [
  {
    id: 1,
    created_at: fromToday(-200, true),
    updated_at: fromToday(-1, true),
    name: "So bio etic",
    is_vegan: false,
    is_cf: true,
  },
  {
    id: 2,
    created_at: fromToday(-200, true),
    updated_at: fromToday(-1, true),
    name: "Avril",
    is_vegan: false,
    is_cf: true,
  },
  {
    id: 3,
    created_at: fromToday(-200, true),
    updated_at: fromToday(-1, true),
    name: "Energie fruit",
    is_vegan: true,
    is_cf: true,
  },
  {
    id: 4,
    created_at: fromToday(-20, true),
    updated_at: fromToday(-10, true),
    name: "Comme avant",
    is_vegan: true,
    is_cf: true,
  },
  {
    id: 5,
    created_at: fromToday(-10, true),
    updated_at: fromToday(-5, true),
    name: "Torriden",
    is_vegan: false,
    is_cf: false,
  },
];

export async function getCosmetics() {
  try {
    const res = await axiosInstance.get(`${API_URL}/cosmetics`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load cosmetics. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load cosmetics. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load cosmetics. Error: ${error.message}`);
    }
  }
}

export async function getSearchCosmetics({ filters, sortBy, page, size }) {
  const data = await Promise.resolve(COSMETICS);
  const count = data.length;

  const error = count > 0 ? false : true;
  if (error) {
    console.error(error);
    throw new Error("Cosmetics could not be loaded");
  }
  const params = buildURLSearchParams(filters, sortBy, page, size);
  console.log([`${API_URL}/cosmetics`, params].filter(Boolean).join("?"));

  return { data, count };
}

export async function getCosmetic(id) {
  const data = await Promise.resolve(
    COSMETICS.filter((p) => p.id === Number(id))[0]
  );
  const error = data ? false : true;
  if (error) {
    console.error(error);
    throw new Error("Cosmetic not found");
  }

  return data;
}

export async function createCosmetic(cosmetic) {
  const id = COSMETICS.length + 1;
  const newCosmetic = { id: id, ...cosmetic };
  const data = await Promise.resolve(newCosmetic);
  const error = data ? false : true;
  if (error) {
    throw new Error(`Cosmetic # ${id} not created`);
  }

  return data;
}

export async function updateCosmetic(id, cosmetic) {
  console.log(id, cosmetic);
  const data = await Promise.resolve({ id: id, ...cosmetic });
  const error = data ? false : true;
  if (error) {
    throw new Error(`Cosmetic # ${id} not updated`);
  }

  return data;
}

export async function deleteCosmetic(id) {
  const data = await Promise.resolve(
    `Cosmetic # ${id} was successfully deleted`
  );

  const error = data ? false : true;
  if (error) {
    throw new Error(`Cosmetic # ${id} not deleted`);
  }

  return data;
}
