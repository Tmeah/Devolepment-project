import React, { useState } from "react";
import axios from "axios";
import "../styles/ChemicalDatabase.css";

const getChemicalDetails = async (chemicalName) => {
  try {
    const searchResponse = await axios.get(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chemicalName}/cids/JSON`
    );
    const cid = searchResponse.data?.IdentifierList?.CID?.[0];
    if (!cid) {
      throw new Error(`Could not find CID for chemical name: ${chemicalName}`);
    }
    const response = await axios.get(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON`
    );
    if (!response.data?.Record) {
      throw new Error(
        `Could not retrieve chemical details for chemical name: ${chemicalName}`
      );
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const Section = ({ section, expanded, onClick }) => {
  const toggle = () => onClick(section.TOCHeading);

  const renderDisplayControls = () => {
    if (section.DisplayControls) {
      return (
        <div className="display-controls">
          {section.DisplayControls.Information &&
            section.DisplayControls.Information.map((info, index) => (
              <p key={index}>
                {info.Value.StringWithMarkup[0]?.String || "Not available"}
              </p>
            ))}
        </div>
      );
    }
  };

  return (
    <div className={`section${expanded ? " expanded" : ""}`}>
      <h3 onClick={toggle}>{section.TOCHeading}</h3>
      {expanded && (
        <div className="section-content">
          {section.Section &&
            section.Section.map((subSection, index) => (
              <NestedSection key={index} section={subSection} />
            ))}
          {renderDisplayControls()}
        </div>
      )}
    </div>
  );
};

const NestedSection = ({ section }) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(!expanded);

  const extractContent = (info) => {
    if (info?.Value?.StringWithMarkup) {
      return info.Value.StringWithMarkup.map((markup, index) => {
        if (markup.URL) {
          return (
            <a key={index} href={markup.URL} target="_blank" rel="noreferrer">
              {markup.String}
            </a>
          );
        } else {
          return <span key={index}>{markup.String}</span>;
        }
      });
    }
    return "Not available";
  };

  return (
    <div className={`nested-section${expanded ? " expanded" : ""}`}>
      <h4 onClick={toggle}>{section.TOCHeading}</h4>
      {expanded && (
        <div className="nested-section-content">
          <p>{section.Description || "Not available"}</p>
          {section.Information &&
            section.Information.map((info, index) => (
              <p key={index}>{extractContent(info)}</p>
            ))}
          {section.Section &&
            section.Section.map((subSection, index) => (
              <NestedSection key={index} section={subSection} />
            ))}
        </div>
      )}
    </div>
  );
};

const ChemicalDatabase = () => {
  const [chemicalDetails, setChemicalDetails] = useState(null);
  const [chemicalName, setChemicalName] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  const hasSubSections = (section) => {
    return section.Section && section.Section.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = chemicalName.trim();
    if (!trimmedName) {
      alert("Please enter a valid chemical name.");
      return;
    }
    const details = await getChemicalDetails(trimmedName);
    if (details instanceof Error) {
      alert(details.message);
    } else {
      setChemicalDetails(details);
      setExpandedSection(null);
    }
  };

  const toggleSection = (heading) => {
    if (expandedSection === heading) {
      setExpandedSection(null);
    } else {
      setExpandedSection(heading);
    }
  };

  return (
    <div className="main-div">
      <form onSubmit={handleSubmit}>
        <label>
          Chemical Name:
          <input
            type="text"
            value={chemicalName}
            onChange={(e) => setChemicalName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {chemicalDetails && chemicalDetails.Record ? (
        <div className="chemical-details-container">
          <h2>{chemicalDetails.Record.RecordTitle}</h2>
          {chemicalDetails.Record.Section.filter(hasSubSections).map(
            (section, index) => (
              <Section
                key={index}
                section={section}
                expanded={expandedSection === section.TOCHeading}
                onClick={toggleSection}
              />
            )
          )}
        </div>
      ) : (
        <p className="input-container">
          Enter the name of a chemical to see details.
        </p>
      )}
    </div>
  );
};

export default ChemicalDatabase;
