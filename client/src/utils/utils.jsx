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
