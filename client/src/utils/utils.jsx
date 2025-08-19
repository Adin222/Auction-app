import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSDK.js";

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

export const uploadMultiplePhotos = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const storageRef = ref(storage, `photos/${Date.now()}_${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  });

  const downloadURLs = await Promise.all(uploadPromises);
  return downloadURLs;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
