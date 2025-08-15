export const parseLocation = (path) => {
  const parts = path.split("/").filter(Boolean);

  const first = parts[0] ? parts[0].replace(/-/g, " ") : "";
  const second = parts[1] ? parts[1].replace(/-/g, " ") : "";

  return { first, second };
};

export const getActiveFromPath = (pathname) => {
  switch (pathname) {
    case "/":
      return "HOME";
    case "/shop":
      return "SHOP";
    case "/my-account":
      return "MY ACCOUNT";
    default:
      return "";
  }
};
