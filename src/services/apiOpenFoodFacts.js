const OFF_API_URL = "https://world.openfoodfacts.net/api/v2";

export async function getProductData(ean) {
  const res = await fetch(
    `${OFF_API_URL}/product/${ean}?product_type=all&fields=brands,product_name_fr,product_name,image_url,ingredients_text,additives_tags`,
    {
      method: "GET",
      headers: { Authorization: `Basic ${btoa("off:off")}` },
    }
  );
  if (!res.ok) {
    throw new Error(
      `Couldn't find product #${ean}. Response status: ${res.status}`
    );
  }
  const data = await res.json();
  if (!data.product) {
    throw new Error(`Couldn't find product #${ean}`);
  }
  return data?.product;
}
