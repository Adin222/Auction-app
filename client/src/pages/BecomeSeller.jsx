import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FirstStep } from "../components/Auction/FirstStep";
import { SecondStep } from "../components/Auction/SecondStep";
import { ThirdStep } from "../components/Auction/ThirdStep";
import { CustomStepIcon } from "../components/CustomStepIcon";

const base64ToFile = (base64, filename = "file") => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const steps = ["", "", ""];

export const BecomeSeller = () => {
  const [step, setStep] = useState(1);
  const [body, setBody] = useState({
    name: "",
    category: "",
    description: "",
    photos: [],
    startPrice: 0,
    startDate: "",
    endDate: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auctionForm");
    if (data) {
      const parsed = JSON.parse(data);
      const photosFiles = parsed.photos?.map((base64, i) =>
        base64ToFile(base64, `photo-${i}.png`)
      );
      setBody({ ...parsed, photos: photosFiles || [] });
    }
  }, []);

  const saveToLocal = async () => {
    const photosBase64 = await Promise.all(
      (body.photos || []).map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    );

    const bodyToSave = { ...body, photos: photosBase64 };
    localStorage.setItem("auctionForm", JSON.stringify(bodyToSave));
  };

  const handleAuction = (event) => {
    setBody((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePhotos = (photos) => {
    setBody((prev) => ({
      ...prev,
      photos,
    }));
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box>
        <Stepper activeStep={step}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 1 && (
          <FirstStep
            setStep={setStep}
            handleAuction={handleAuction}
            handlePhotos={handlePhotos}
            body={body}
            saveToLocal={saveToLocal}
          />
        )}
        {step === 2 && (
          <SecondStep
            setStep={setStep}
            handleAuction={handleAuction}
            body={body}
            saveToLocal={saveToLocal}
          />
        )}
        {step === 3 && (
          <ThirdStep
            setStep={setStep}
            handleAuction={handleAuction}
            body={body}
            saveToLocal={saveToLocal}
          />
        )}
      </Box>
    </Box>
  );
};
