import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

function sortByInputFirst(input, data) {
  const [first, others] = data.reduce(
    ([a, b], c) =>
      c.label.toLowerCase().indexOf(input.toLowerCase()) == 0
        ? [[...a, c], b]
        : [a, [...b, c]],
    [[], []]
  );
  return first.concat(others);
}

export async function getBrands() {
  try {
    const res = await axiosInstance.get(`${API_URL}/brands/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load brands. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(`Couldn't load brands. Request error: ${error.request}`);
    } else {
      throw new Error(`Couldn't load brands. Error: ${error.message}`);
    }
  }
}

export async function getSearchBrands({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/brands/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched brands. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched brands. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load searched brands. Error: ${error.message}`);
    }
  }
}

export async function getBrandsForSelect(searchName, operator = "ilike") {
  try {
    const filters = searchName
      ? [{ field: `name__${operator}`, value: searchName }]
      : [];
    const sortBy = "name-asc";
    const page = 1;
    const size = 100;
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/brands/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return {
      data: sortByInputFirst(
        searchName,
        data.items.map((item) => ({ value: item.id, label: item.name }))
      ),
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched brands. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched brands. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load searched brands. Error: ${error.message}`);
    }
  }
}

export async function getBrand(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/brands/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find brand #${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find brand #${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't find brand #${id}. Error: ${error.message}`);
    }
  }
}

export async function createBrand(brand) {
  try {
    const res = await axiosInstance.post(`${API_URL}/brands/`, brand);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette marque existe déjà.`);
      throw new Error(
        `Couldn't create brand. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(`Couldn't create brand. Request error: ${error.request}`);
    } else {
      throw new Error(`Couldn't create brand. Error: ${error.message}`);
    }
  }
}

export async function updateBrand(id, brand) {
  try {
    const res = await axiosInstance.put(`${API_URL}/brands/${id}`, brand);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette marque existe déjà.`);
      throw new Error(
        `Couldn't update brand # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update brand # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't update brand # ${id}. Error: ${error.message}`);
    }
  }
}

export async function deleteBrand(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/brands/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete brand # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete brand # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't delete brand # ${id}. Error: ${error.message}`);
    }
  }
}
