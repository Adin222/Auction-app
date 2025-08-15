import Check from "@mui/icons-material/Check";
import Box from "@mui/material/Box";

export const CustomStepIcon = ({ completed, className }) => {
  return (
    <Box
      className={className}
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: completed ? "purple" : "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      {completed && <Check fontSize="small" />}
    </Box>
  );
};
