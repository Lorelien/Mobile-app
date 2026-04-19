const WEBFLOW_TOKEN = "33678b045e9be70c68b8963a32a7d48642ae83799c56d92fc01c5601b05c255c";
const PRODUCTS_COLLECTION_ID = "699ef93fdfa3805d769a257e";
const BLOGS_COLLECTION_ID = "699ef93f076328750d38d0de";
const SITE_ID = "698c7fe5d14b024d93181e67";

const headers = {
  Authorization: `Bearer ${WEBFLOW_TOKEN}`,
  Accept: "application/json",
};

const fetchCollectionItems = async (collectionId) => {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items/live`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`Fout bij ophalen van collection ${collectionId}`);
  }

  const data = await response.json();
  return data.items || [];
};

export const fetchProducts = async () => {
  const response = await fetch(
    `https://api.webflow.com/v2/sites/${SITE_ID}/products`,
    { headers }
  );

  console.log("PRODUCTS status:", response.status);
  console.log("PRODUCTS ok:", response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("PRODUCTS error:", errorText);
    throw new Error("Fout bij ophalen van producten");
  }

  const data = await response.json();
  console.log("PRODUCTS data:", JSON.stringify(data, null, 2));

  return data.items.map((item) => {
    const firstSku = item.skus && item.skus.length > 0 ? item.skus[0] : null;

    return {
      id: item.id,
      title: item.fieldData?.name || "Geen naam",
      description: item.fieldData?.description || "Geen beschrijving",
      price: Number(firstSku?.fieldData?.price?.value || 0) / 100,
      image:
        firstSku?.fieldData?.["main-image"]?.url ||
        item.fieldData?.["main-image"]?.url ||
        null,
    };
  });
};

export const fetchBlogs = async () => {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${BLOGS_COLLECTION_ID}/items/live`,
    { headers }
  );

  console.log("BLOGS status:", response.status);
  console.log("BLOGS ok:", response.ok);

  if (!response.ok) {
    throw new Error("Fout bij ophalen van blogs");
  }

  const data = await response.json();
  console.log("BLOGS data:", JSON.stringify(data, null, 2));

  return data.items.map((item) => ({
    id: item.id,
    title: item.fieldData?.name || "Geen titel",
    description: item.fieldData?.["post-summary"] || "Geen korte beschrijving",
    longDescription: item.fieldData?.["post-summary"] || "Geen inhoud",
    image: item.fieldData?.["main-image"]?.url || null,
  }));
};