import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Card,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uniqueFileId, setUniqueFileId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsLoading(true);
    const response = await fetch("http://localhost:4000/files/upload", {
      body: formData,
      method: "POST",
    });

    const data = await response.json();
    setIsLoading(false);

    setUniqueFileId(data.fileId);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (uniqueFileId) {
    return (
      <Typography>
        This is your unique File ID.
        <Card variant="outlined" elevation={5}>
          <Typography
            sx={{ fontWeight: "bold", wordBreak: "break-word", width: "500px" }}
          >
            {uniqueFileId}
          </Typography>
        </Card>
        You can share this with others to allow them download.
      </Typography>
    );
  }

  return (
    <Grid container margin={12}>
      <Grid item xs={12}>
        <Typography variant="h6">Upload a File</Typography>
      </Grid>
      <Grid item xs={12}>
        <input
          accept=".jpg,.jpeg,.png,.gif"
          hidden={true}
          id="file-upload"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" color="primary" component="span">
            Select File
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedFile}
          onClick={handleSubmit}
          style={{ marginLeft: "1rem" }}
          startIcon={<FileUploadIcon />}
        >
          Upload
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadFile;
