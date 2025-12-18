import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUserTie,
  FaGift,
  FaClock,
  FaFileAlt,
  FaCheckCircle,
  FaUsers,
  FaRupeeSign,
  FaHome,
  FaBriefcase,
  FaPhoneAlt,
  FaBook,
  FaTransgenderAlt,
} from 'react-icons/fa';
import schemeApi from '../api/schemeApi';
import eligibilityApi from '../api/eligibilityApi';
import '../css/SchemeDetail.css';

const SchemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schemeInfo, setSchemeInfo] = useState(null);
  const [eligibilityInfo, setEligibilityInfo] = useState(null);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    // Fetch scheme details and eligibility info when component mounts or id changes
    const fetchDetails = async () => {
      try {
        const schemeData = await schemeApi.getSchemeById(id);
        setSchemeInfo(schemeData);

        // eligibilityApi returns an array, grab first item or fallback to empty object
        const [eligibilityData] = await eligibilityApi.getEligibilityByScheme(id);
        setEligibilityInfo(eligibilityData || {});
      } catch (error) {
        console.error('Error fetching scheme details:', error);
        setFetchError('Failed to load scheme details. Please try again later.');
      }
    };

    fetchDetails();
  }, [id]);

  if (fetchError) return <p className="error-message">{fetchError}</p>;
  if (!schemeInfo) return <p className="loading-message">Loading scheme details…</p>;

  return (
    <div className="scheme-detail-container">
      <button
        className="scheme-back-btn"
        onClick={() => navigate(-1)} // simple back navigation
      >
        <FaArrowLeft className="back-icon" />
        Back to Schemes
      </button>

      <div className="scheme-detail-card">
        <header className="scheme-header">
          <FaCheckCircle className="header-icon" />
          <h1>{schemeInfo.scheme_name}</h1>
          <span className={`status-badge ${schemeInfo.status.toLowerCase()}`}>
            {schemeInfo.status}
          </span>
        </header>

        <section className="scheme-body">
          <div className="info-grid">
            {/* Each info block shows icon + label + value */}
            <InfoBlock icon={<FaCalendarAlt />} label="Launch Date" value={schemeInfo.launched_date} />
            <InfoBlock icon={<FaUserTie />} label="Launched By" value={schemeInfo.launched_by} />
            <InfoBlock icon={<FaGift />} label="Benefits" value={schemeInfo.benefits} />
            <InfoBlock
              icon={<FaClock />}
              label="Application Period"
              value={`${schemeInfo.application_start_date} to ${schemeInfo.application_end_date}`}
            />
            <InfoBlock icon={<FaFileAlt />} label="Documents Required" value={schemeInfo.documents_required} />
            <InfoBlock icon={<FaPhoneAlt />} label="Contact Info" value={schemeInfo.contact_info} />
          </div>

          <div className="info-item full-width">
            <FaFileAlt className="info-icon" />
            <div className="info-content">
              <h3>How to Apply</h3>
              <p>{schemeInfo.how_to_apply}</p>
              {schemeInfo.application_portal && (
                <a
                  href={schemeInfo.application_portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-link"
                >
                  Visit Application Portal
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="eligibility-section">
        <header className="scheme-header">
          <FaCheckCircle className="header-icon" />
          <h1>Eligibility Criteria</h1>
        </header>

        <div className="eligibility-grid">
          {eligibilityInfo?.age_min && (
            <EligibilityItem
              icon={<FaUsers />}
              label="Age Requirement"
              value={`${eligibilityInfo.age_min} - ${eligibilityInfo.age_max} years`}
            />
          )}

          {eligibilityInfo?.gender && (
            <EligibilityItem icon={<FaTransgenderAlt />} label="Gender" value={eligibilityInfo.gender} />
          )}

          {eligibilityInfo?.income_limit && (
            <EligibilityItem icon={<FaRupeeSign />} label="Income Limit" value={eligibilityInfo.income_limit} />
          )}

          {eligibilityInfo?.caste_category && (
            <EligibilityItem icon={<FaUsers />} label="Caste Category" value={eligibilityInfo.caste_category} />
          )}

          {eligibilityInfo?.education_qualification && (
            <EligibilityItem
              icon={<FaBook />}
              label="Education Qualification"
              value={eligibilityInfo.education_qualification}
            />
          )}

          {eligibilityInfo?.profession && (
            <EligibilityItem icon={<FaBriefcase />} label="Profession" value={eligibilityInfo.profession} />
          )}

          {eligibilityInfo?.residence_requirement && (
            <EligibilityItem icon={<FaHome />} label="Residence" value={eligibilityInfo.residence_requirement} />
          )}
        </div>
      </section>
    </div>
  );
};

// Small reusable components to keep JSX cleaner

const InfoBlock = ({ icon, label, value }) => (
  <div className="info-item">
    <div className="info-icon">{icon}</div>
    <div className="info-content">
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  </div>
);

const EligibilityItem = ({ icon, label, value }) => (
  <div className="eligibility-item">
    <div className="eligibility-icon">{icon}</div>
    <div className="info-content">
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  </div>
);

export default SchemeDetail;

/* 
  TODO: 
  - Add better error UI instead of just plain text.
  - Format dates nicely instead of raw strings.
  - Handle cases where some scheme or eligibility fields might be missing or null.
  - Add loading spinner instead of simple text for better UX.
  - Consider caching scheme data to avoid refetch on every visit.
*/
