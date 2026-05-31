import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { dataportfolio, meta } from "../../data/content.jsx";
import "./Portfolio.css";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  
  // Get unique categories
  const categories = ["all", ...new Set(dataportfolio.map(item => item.category))];
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? dataportfolio 
    : dataportfolio.filter(project => project.category === filter);

  return (
    <HelmetProvider>
      <div className="portfolio-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <div className="portfolio-header">
          <h1 className="display-4 mb-4">Portfolio</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </div>

        {/* Filter Buttons */}
        <div className="portfolio-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === category ? "active" : ""}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project, i) => (
            <div key={i} className="portfolio-item">
              <img src={project.img} alt={project.title || "Project"} />
              <div className="portfolio-overlay">
                <h3>{project.title || "Project"}</h3>
                <p>{project.description}</p>
                <span className="project-category">{project.category}</span>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Portfolio;