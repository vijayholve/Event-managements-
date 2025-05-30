import React, { useContext, useEffect, useState } from "react";
import { SiteConfig } from "../../api/siteconfig/Sitecofig";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import { API_ENDPOINTS } from "../../features/base/config";
import PageLoader from "../loading/PageLoader";

const SiteConfigEditor = () => {
  const { siteConfigData, setSiteConfig } = useContext(SiteConfig);
   useEffect(() => {
  if (siteConfigData && Object.keys(siteConfigData).length > 0) {
    setFormData(siteConfigData);
  }
}, [siteConfigData]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(siteConfigData || {});
  const [error, setError] = useState(null); // State to hold error messages
  const [successMessage, setsuccessMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error when user starts editing
  };
  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // console.log(formData.navbar_image);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataObj.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.MAIN_URL}/siteconfig/main/`,
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSiteConfig(response.data);
      setOpenMessage(true);
      setLoading(false);
      setsuccessMessage("Site configuration updated successfully!");
      setError(null); // Clear error state on success
    } catch (error) {
      if (error.response) {
        // Check if detailed errors are provided
        const errorDetails = error.response.data.details || {};
        const errorMessages = Object.entries(errorDetails)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");

        setError(
          errorMessages || error.response.data.error || "Something went wrong"
        );
        setLoading(false);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setOpenMessage(false);
    }
  };

  if (siteConfigData=="") {
    return <PageLoader reason={"setting detail"} />
  }

  return (
    <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Site Configuration 
      </Typography>

      {/* Display error message */}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Navbar Title"
            name="navbar_title"
            value={formData.navbar_title}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Header Name"
            name="headers_name"
            value={formData.headers_name}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Footer Text"
            name="footer_text"
            value={formData.footer_text}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Contact Email"
            name="contact_email"
            value={formData.contact_email || ""}
            onChange={handleChange}
          />
        </Box>

        {/* Homepage Banner */}

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Primary Color"
            name="primary_color"
            value={formData.primary_color}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Secondary Color"
            name="secondary_color"
            value={formData.secondary_color}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Meta Title"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Meta Description"
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Meta Keywords"
            name="meta_keywords"
            value={formData.meta_keywords}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="About Text"
            name="about_text"
            value={formData.about_text}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Default Language"
            name="default_language"
            value={formData.default_language}
            onChange={handleChange}
          />
        </Box>
             <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="social_links "
            name="social_links"
            value={formData.social_links}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Privacy Policy"
            name="privacy_policy"
            value={formData.privacy_policy}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Terms and Conditions"
            name="terms_and_conditions"
            value={formData.terms_and_conditions}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_maintenance}
                name="is_maintenance"
                onChange={handleChange}
              />
            }
            label="Enable Maintenance Mode"
          />
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-all disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Setting"}
        </button>
      </form>
      {successMessage && (
        <Snackbar
          open={openMessage}
          autoHideDuration={6000}
          onClose={handleCloseMessage}
        >
          <Alert
            onClose={handleCloseMessage}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default SiteConfigEditor;
