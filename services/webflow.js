const WEBFLOW_TOKEN = "0c7286a2902cb370c4d2ad90fb638cb3ff3b290ac74a9f5f56cf653fc8eee9c5";
const BLOGS_COLLECTION_ID = "699ef93f076328750d38d0de";
const SITE_ID = "698c7fe5d14b024d93181e67";

const headers = {
  Authorization: `Bearer ${WEBFLOW_TOKEN}`,
  Accept: "application/json",
};

const categoryNames = {
  "69ac0b5975bfef7bb63f44ca": "Cadeau",
  "69ac0b3fcccf4ccd6996b683": "Malen en wegen",
  "69ac0aa33986fdb451a8e47e": "Zet-accessoires",
  "69ac04a3f0f31535d2cc5551": "Koffie abonnement",
  "69ac049510e50d610fec1d0b": "Koffiebonen",
  "69ac04555d6f9b062111c438": "Koffie zetten thuis",
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

      const categoryId =
        item.fieldData?.category ||
        item.fieldData?.["category"] ||
  "";
      console.log("PRODUCT:", title);
      console.log("RAW CATEGORY ID:", categoryId);
      console.log("TYPE OF CATEGORY ID:", typeof categoryId);
      console.log("MATCH IN categoryNames:", categoryNames[categoryId]);
      console.log("ALL CATEGORY KEYS:", Object.keys(categoryNames));

      const category = categoryNames[categoryId] || "Onbekend"; 

    return {
      id: item.id || `product-${index}`,
      title,
      description,
      price,
      image,
      category,
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