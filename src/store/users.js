const getUserData = async (token) => {
  const res = await fetch("/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    console.log("User data received from server:", data); // Log the received data
    return data;
  } else {
    throw new Error("Failed to get user data from server");
  }
};

export { getUserData };
