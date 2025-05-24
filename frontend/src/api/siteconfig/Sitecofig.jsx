import { useContext, useState, createContext, useEffect } from "react";
import axios, { Axios } from "axios";
import React from "react";
import { API_ENDPOINTS, API_EVENT } from "../../features/base/config";
export const SiteConfig = createContext();
const SiteConfingContent = ({ children }) => {
  const [siteConfigData, setSiteConfig] = useState({
    navbar_title: "",
    headers_name: "",
    footer_text: "",
    social_links: "",

    contact_email: "",
    homepage_banner: null,
    primary_color: "",
    secondary_color: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    about_text: "",
    phone_number: "",
    address: "",
    default_language: "en",
    privacy_policy: "",
    terms_and_conditions: "",
    is_maintenance: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_ENDPOINTS.MAIN_URL}/siteconfig/main/`);
      setSiteConfig({
        navbar_title: response.data.navbar_title,
        headers_name: response.data.headers_name,
        footer_text: response.data.footer_text,
        contact_email: response.data.contact_email,
        social_links: response.data.social_links,
        primary_color: response.data.primary_color,
        secondary_color: response.data.secondary_color,
        meta_title: response.data.meta_title,
        meta_description: response.data.meta_description,
        meta_keywords: response.data.meta_keywords,
        about_text: response.data.about_text,
        phone_number: response.data.phone_number,
        address: response.data.address,
        default_language: response.data.default_language,
        privacy_policy: response.data.privacy_policy,
        terms_and_conditions: response.data.terms_and_conditions,
        is_maintenance: response.data.is_maintenance,
      });

      console.log("Settings Data :",siteConfigData);
    };
    fetchData();
  }, []);                                               
return (
    <SiteConfig.Provider value={{ siteConfigData, setSiteConfig }}>
      {children}
    </SiteConfig.Provider>
  );                  

};

export default SiteConfingContent;
