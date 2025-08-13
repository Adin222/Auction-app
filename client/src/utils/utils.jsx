export const parseLocation = (path) => {
  const parts = path.split("/").filter(Boolean);

  const first = parts[0] ? parts[0].replace(/-/g, " ") : "";
  const second = parts[1] ? parts[1].replace(/-/g, " ") : "";

  return { first, second };
};
