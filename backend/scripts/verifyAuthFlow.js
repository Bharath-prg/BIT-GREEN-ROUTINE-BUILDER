(async () => {
  const email = "mdsaadofficial7019@gmail.com";
  const password = "Saad@123";
  const base = "http://localhost:5000/api";

  try {
    const loginResp = await fetch(base + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginResp.json();
    if (!loginData.success) {
      console.error("LOGIN_FAILED");
      process.exit(1);
    }

    const token = loginData.data.accessToken;

    // Fetch challenges
    const chResp = await fetch(base + "/challenges", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const chData = await chResp.json();

    console.log("CHALLENGE_COUNT:" + (chData.data ? chData.data.length : 0));
    if (chData.data && chData.data.length > 0) {
      chData.data.forEach((c) => {
        console.log(`- ${c.title} (${c.durationDays} days)`);
      });
    }

    // Logout
    const logoutResp = await fetch(base + "/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: loginData.data.refreshToken }),
    });
    const logoutData = await logoutResp.json();
    console.log("LOGOUT_SUCCESS:" + (logoutData.success === true));

    process.exit(0);
  } catch (err) {
    console.error("ERROR:", err.message || err);
    process.exit(1);
  }
})();
