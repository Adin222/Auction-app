import { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const FirstStep = ({
  setStep,
  handleAuction,
  body,
  handlePhotos,
  saveToLocal,
}) => {
  const [photos, setPhotos] = useState(body.photos || []);
  const [error, setError] = useState("");

  useEffect(() => {
    setPhotos(body.photos || []);
  }, [body.photos]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => {
      const updated = [...(prev || []), ...files];
      handlePhotos(updated);
      return updated;
    });
  };

  const validateAndNext = async () => {
    if (
      !body.name.trim() ||
      !body.category.trim() ||
      !body.description.trim() ||
      photos.length < 3
    ) {
      setError("Please fill all fields and upload at least 3 photos.");
      return;
    }
    setError("");
    await saveToLocal();
    setStep(2);
  };

  return (
    <Box sx={{ minWidth: 500, mx: "auto", mt: 5, border: "1px solid #e0e0e0" }}>
      <Box sx={{ backgroundColor: "#fafafa", p: 2 }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          DETAIL INFORMATION ABOUT PRODUCT
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography sx={{ mt: 2 }}>What do you sell?</Typography>
        <TextField
          fullWidth
          placeholder="2-5 words (60 characters)"
          value={body.name}
          name="name"
          onChange={handleAuction}
          sx={{ mt: 1 }}
        />

        <Box sx={{ mt: 2 }}>
          <Select
            fullWidth
            displayEmpty
            name="category"
            value={body.category}
            onChange={handleAuction}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="technology">Technology</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="furniture">Furniture</MenuItem>
            <MenuItem value="books">Books</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
          </Select>
        </Box>

        <Typography sx={{ mt: 2 }}>Description</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          name="description"
          placeholder="100 words (700 characters)"
          value={body.description}
          onChange={handleAuction}
          inputProps={{ maxLength: 700 }}
          sx={{ mt: 1 }}
        />

        <Box
          sx={{
            mt: 3,
            p: 3,
            minHeight: 300,
            border: "1px dashed #ccc",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            component="label"
            htmlFor="upload-photo"
            sx={{ color: "purple", cursor: "pointer" }}
          >
            Upload Photos
          </Typography>
          <input
            id="upload-photo"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            or just drag and drop
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            + Add 3 photos
          </Typography>

          {photos.length > 0 && (
            <Box
              sx={{
                display: "flex",
                mt: 2,
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {photos.map((item, index) => (
                <Box
                  key={index}
                  sx={{ position: "relative", width: 80, height: 80 }}
                >
                  <img
                    src={
                      item instanceof File ? URL.createObjectURL(item) : item
                    }
                    alt={`preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                  <Button
                    size="small"
                    onClick={() => {
                      setPhotos((prev) => {
                        const updated = prev.filter((_, i) => i !== index);
                        handlePhotos(updated);
                        return updated;
                      });
                    }}
                    sx={{
                      minWidth: 0,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      padding: 0,
                      position: "absolute",
                      top: -5,
                      right: -5,
                      color: "white",
                      backgroundColor: "grey",
                      "&:hover": { backgroundColor: "lightgrey" },
                    }}
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            sx={{
              px: 3,
              borderColor: "purple",
              color: "purple",
              "&:hover": { borderColor: "purple" },
            }}
            variant="outlined"
            component={Link}
            to="/"
          >
            BACK
          </Button>
          <Button
            variant="outlined"
            onClick={validateAndNext}
            sx={{
              px: 3,
              borderColor: "purple",
              color: "white",
              backgroundColor: "purple",
              "&:hover": { borderColor: "purple" },
            }}
          >
            NEXT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
