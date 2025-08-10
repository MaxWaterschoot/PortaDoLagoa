export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !token) {
    return new Response(JSON.stringify({
      source: "mock",
      items: [
        { id: "m1", reviewer: "Facebook User", rating: 5, review_text: "Prachtig verblijf en super gastvrij!", created_time: "2024-06-01" },
        { id: "m2", reviewer: "FB Guest", rating: 4, review_text: "Heerlijk ontbijt en wellness.", created_time: "2024-07-15" },
        { id: "m3", reviewer: "Anoniem", rating: 5, review_text: "Zeezicht en rust, top!", created_time: "2024-08-02" }
      ]
    }), { headers: { "content-type": "application/json" } });
  }

  const fields = "review_text,recommendation_type,has_rating,rating,created_time,reviewer{name}";
  const url = `https://graph.facebook.com/v19.0/${pageId}/ratings?access_token=${encodeURIComponent(token)}&fields=${encodeURIComponent(fields)}&limit=10`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ source: "facebook", error: data }), { status: 500, headers: { "content-type": "application/json" } });
    }
    const items = (data.data || []).map((r) => ({
      id: r.id,
      reviewer: r.reviewer?.name || "Facebook gebruiker",
      rating: r.rating ?? (r.recommendation_type === "positive" ? 5 : 3),
      review_text: r.review_text || "",
      created_time: r.created_time
    }));
    return new Response(JSON.stringify({ source: "facebook", items }), { headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ source: "facebook", error: String(e) }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
