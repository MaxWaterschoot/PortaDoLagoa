export async function POST(req) {
  try {
    const { token, action = "submit" } = await req.json();
    if (!token) {
      return Response.json(
        { success: false, error: "no-token" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY || "",
      response: token,
    });

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const data = await res.json();
    // data: { success, score, action, hostname, ... }

    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);
    const ok =
      data.success === true &&
      typeof data.score === "number" &&
      data.score >= minScore &&
      // (optioneel) actie matchen als je die consistent meegeeft
      (data.action ? data.action === action : true);

    if (!ok) {
      return Response.json(
        {
          success: false,
          score: data.score ?? null,
          error: data["error-codes"] ?? "low-score",
        },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, score: data.score ?? null },
      { status: 200 }
    );
  } catch (e) {
    return Response.json(
      { success: false, error: "server-error" },
      { status: 500 }
    );
  }
}
