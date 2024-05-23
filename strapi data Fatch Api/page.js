import AboutUs from "../../../components/aboutUs/AboutUs";
import React from "react";
import {
  fetchAPI,
  aboutUsHeading,
  companyOverview,
  vissionMission,
  ourJourney,
  boardDirector,
  managmentTeam,
  tabSection,
} from "../../../../lib/api";
const page = async () => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const companyOverviewObject = {
    populate:
      "difference.img,operative_values.cover_img,operative.icon,cover_img,img,operative_difference.icon,overview.img ",
  };
  
  const company_overview_new = await fetchAPI(
    "/aboutus-company-overviews",
    companyOverviewObject,
    options
  );
  
 
  return (
    <AboutUs
    company_overview_new={company_overview?.data[0]}
   
    />
  );
};

export default page;
