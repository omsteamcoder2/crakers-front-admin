import React, { useState, useEffect } from "react";
import axios from "axios";
import CTASection from "../components/CTASection";
import ManageProjects from "../components/ManageProjects";
import TopSection from "../components/TopSection";

const Projects1 = () => {
  const [projects, setProjects] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/projects`);
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
    <TopSection heading1={"Our Projects"} heading2={"Explore some of our successful construction and design projects"} />
      <ManageProjects />
      <CTASection />
    </>
  );
};

export default Projects1;
