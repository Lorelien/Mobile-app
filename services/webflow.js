const WEBFLOW_TOKEN = "fb285d85cb37ac6a423995966bb17e044edbcad53ab65e14e4b184e3aaa38959";
const BLOGS_COLLECTION_ID = "699ef93f076328750d38d0de";
const SITE_ID = "698c7fe5d14b024d93181e67";

const headers = {
  Authorization: `Bearer ${WEBFLOW_TOKEN}`,
  Accept: "application/json",
};

export const fetchProducts = async () => {
  const response = await fetch(
    `https://api.webflow.com/v2/sites/${SITE_ID}/products`,
    { headers }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fout bij ophalen van producten: ${errorText}`);
  }

  const data = await response.json();

  return (data.items || []).map((item, index) => {
    const firstSku = item.skus && item.skus.length > 0 ? item.skus[0] : null;

    const title =
      item.fieldData?.name ||
      firstSku?.fieldData?.name ||
      `Product ${index + 1}`;

    const description =
  item.fieldData?.description?.trim() ||
  firstSku?.fieldData?.description?.trim() ||
  `Ontdek onze ${title.toLowerCase()} koffie met een uniek smaakprofiel.`;

    const rawPrice = firstSku?.fieldData?.price?.value;
    const price =
      rawPrice !== undefined && rawPrice !== null
        ? `€${(rawPrice / 100).toFixed(2)}`
        : "Geen prijs";

    const image =
      firstSku?.fieldData?.["main-image"]?.url ||
      item.fieldData?.["main-image"]?.url ||
      null;

    return {
      id: item.id || `product-${index}`,
      title,
      description,
      price,
      image,
    };
  });
};

export const fetchBlogs = async () => {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${BLOGS_COLLECTION_ID}/items/live`,
    { headers }
  );

  console.log("BLOGS status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("BLOGS error body:", errorText);
    throw new Error("Fout bij ophalen van blogs");
  }

  const data = await response.json();
  console.log("BLOGS raw:", JSON.stringify(data, null, 2));

  return (data.items || []).map((item, index) => ({
    id: item.id || `blog-${index}`,
    title: item.fieldData?.name || "Geen titel",
    description:
      item.fieldData?.["post-summary"] ||
      item.fieldData?.summary ||
      item.fieldData?.description ||
      "Geen korte beschrijving",
    longDescription:
      item.fieldData?.["post-body"] ||
      item.fieldData?.body ||
      item.fieldData?.content ||
      "Geen inhoud",
    image: item.fieldData?.["main-image"]?.url || null,
  }));
};