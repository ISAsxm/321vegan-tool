import { buildURLSearchParams, sortByInputFirst } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "./axiosInstance";

export async function getScoringCategories() {
  try {
    const res = await axiosInstance.get(`${API_URL}/scoring/categories`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load scoring categories. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load scoring categories. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load scoring categories. Error: ${error.message}`
      );
    }
  }
}

export async function getSearchScoringCategories({
  filters,
  sortBy,
  page,
  size,
}) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/scoring/categories/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched scoring categories. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched scoring categories. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched scoring categories. Error: ${error.message}`
      );
    }
  }
}

export async function getScoringCategoriesForSelect(
  searchName,
  operator = "lookalike"
) {
  try {
    const filters = searchName
      ? [{ field: `name__${operator}`, value: searchName }]
      : [];
    const sortBy = "name-asc";
    const page = 1;
    const size = 100;
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/scoring/categories/search`, params].filter(Boolean).join("?")
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
        `Couldn't load searched categories. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched categories. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched categories. Error: ${error.message}`
      );
    }
  }
}

export async function createScoringCategory(category) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/scoring/categories`,
      category
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette catégorie existe déjà.`);
      throw new Error(
        `Couldn't create scoring category. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create scoring category. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't create scoring category. Error: ${error.message}`
      );
    }
  }
}

export async function updateScoringCategory(id, category) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/scoring/categories/${id}`,
      category
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update scoring category # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update scoring category # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update scoring category # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteScoringCategory(id) {
  try {
    const res = await axiosInstance.delete(
      `${API_URL}/scoring/categories/${id}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete scoring category # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete scoring category # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete scoring category # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function getScoringCriteria() {
  try {
    const res = await axiosInstance.get(`${API_URL}/scoring/criteria/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load scoring criteria. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load scoring criteria. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load scoring criteria. Error: ${error.message}`
      );
    }
  }
}

export async function getSearchScoringCriteria({
  filters,
  sortBy,
  page,
  size,
}) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/scoring/criteria/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched scoring criteria. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched scoring criteria. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched scoring criteria. Error: ${error.message}`
      );
    }
  }
}

export async function createScoringCriterion(criterion) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/scoring/criteria`,
      criterion
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create scoring criterion. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create scoring criterion. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't create scoring criterion. Error: ${error.message}`
      );
    }
  }
}

export async function updateScoringCriterion(id, criterion) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/scoring/criteria/${id}`,
      criterion
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update scoring criterion # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update scoring criterion # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update scoring criterion # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteScoringCriterion(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/scoring/criteria/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete scoring criteria # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete scoring criteria # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete scoring criteria # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function createUpdateBrandScore(brandId, scoreData) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/scoring/brands/${brandId}/scores`,
      scoreData
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create brand score. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create brand score. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't create brand score. Error: ${error.message}`);
    }
  }
}

export async function getBrandScores(brandId) {
  try {
    const res = await axiosInstance.get(
      `${API_URL}/scoring/brands/${brandId}/scores`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load brand scores. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load brand scores. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load brand scores. Error: ${error.message}`);
    }
  }
}

export async function updateBrandScore(brandId, scoreData) {
  try {
    const { criterion_id, description, score } = scoreData;
    const res = await axiosInstance.put(
      `${API_URL}/scoring/brands/${brandId}/scores/${criterion_id}`,
      { description: description, score: score }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update brand score. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update brand score. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't update brand score. Error: ${error.message}`);
    }
  }
}

export async function deleteBrandScore(brandId, criterionId) {
  try {
    const res = await axiosInstance.delete(
      `${API_URL}/scoring/brands/${brandId}/scores/${criterionId}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete brand score # ${brandId} criterion # ${criterionId}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete brand score # ${brandId} criterion # ${criterionId}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete brand score # ${brandId} criterion # ${criterionId}. Error: ${error.message}`
      );
    }
  }
}

export async function getBrandScoringReport(brandId) {
  try {
    const res = await axiosInstance.get(
      `${API_URL}/scoring/brands/${brandId}/scoring-report`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load brand scoring report. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load brand scoring report. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load brand scoring report. Error: ${error.message}`
      );
    }
  }
}
