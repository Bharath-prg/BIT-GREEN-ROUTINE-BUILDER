const http = require("http");

function request(path, method = "GET", data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 5000,
      path: "/api" + path,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) options.headers.Authorization = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body || "{}");
          resolve({ statusCode: res.statusCode, body: parsed });
        } catch (err) {
          resolve({ statusCode: res.statusCode, body: body });
        }
      });
    });

    req.on("error", (err) => reject(err));

    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

(async () => {
  try {
    const creds = {
      email: "mdsaadofficial7019@gmail.com",
      password: "Saad@123",
    };
    const login = await request("/auth/login", "POST", creds);
    if (!login.body || !login.body.success) {
      console.error("LOGIN_FAILED");
      process.exit(1);
    }

    const token = login.body.data.accessToken;
    const refresh = login.body.data.refreshToken;

    const ch = await request("/challenges", "GET", null, token);
    const list = ch.body && ch.body.data ? ch.body.data : [];
    console.log("CHALLENGE_COUNT:" + list.length);
    list.forEach((c) => console.log(`- ${c.title} (${c.durationDays} days)`));

    const logout = await request(
      "/auth/logout",
      "POST",
      { refreshToken: refresh },
      token
    );
    console.log(
      "LOGOUT_SUCCESS:" + (logout.body && logout.body.success === true)
    );
    process.exit(0);
  } catch (err) {
    console.error("ERROR:", err && err.message ? err.message : err);
    process.exit(1);
  }
})();
