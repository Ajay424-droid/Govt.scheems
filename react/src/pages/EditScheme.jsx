import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import schemeApi from '../api/schemeApi';
import eligibilityApi from '../api/eligibilityApi';
import '../css/EditScheme.css';

const EditScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state for both scheme and eligibility data
  const [formData, setFormData] = useState({
    scheme_name: '',
    category_id: '',
    launched_by: '',
    launched_date: '',
    application_start_date: '',
    application_end_date: '',
    how_to_apply: '',
    status: 'Open',
    application_portal: '',
    benefits: '',
    documents_required: '',
    contact_info: '',
    eligibility_id: null,
    age_min: '',
    age_max: '',
    gender: '',
    income_limit: '',
    caste_category: '',
    profession: '',
    education_qualification: '',
    residence_requirement: ''
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadSchemeDetails() {
      try {
        const schemeDetails = await schemeApi.getSchemeById(id);
        const eligibilityList = await eligibilityApi.getEligibilityByScheme(id);
        const eligibilityDetails = eligibilityList[0] || {};

        // Note: date strings sliced to 'YYYY-MM-DD' format for date inputs
        setFormData({
          scheme_name: schemeDetails.scheme_name || '',
          category_id: schemeDetails.category_id || '',
          launched_by: schemeDetails.launched_by || '',
          launched_date: schemeDetails.launched_date ? schemeDetails.launched_date.slice(0, 10) : '',
          application_start_date: schemeDetails.application_start_date ? schemeDetails.application_start_date.slice(0, 10) : '',
          application_end_date: schemeDetails.application_end_date ? schemeDetails.application_end_date.slice(0, 10) : '',
          how_to_apply: schemeDetails.how_to_apply || '',
          status: schemeDetails.status || 'Open',
          application_portal: schemeDetails.application_portal || '',
          benefits: schemeDetails.benefits || '',
          documents_required: schemeDetails.documents_required || '',
          contact_info: schemeDetails.contact_info || '',
          eligibility_id: eligibilityDetails.eligibility_id || null,
          age_min: eligibilityDetails.age_min || '',
          age_max: eligibilityDetails.age_max || '',
          gender: eligibilityDetails.gender || '',
          income_limit: eligibilityDetails.income_limit || '',
          caste_category: eligibilityDetails.caste_category || '',
          profession: eligibilityDetails.profession || '',
          education_qualification: eligibilityDetails.education_qualification || '',
          residence_requirement: eligibilityDetails.residence_requirement || ''
        });
      } catch (err) {
        console.error('Failed to fetch scheme or eligibility info:', err);
        setErrorMsg('Could not load scheme data, please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadSchemeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handles form input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handles form submission to update scheme and eligibility info
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // Destructure for clarity
      const {
        scheme_name,
        category_id,
        launched_by,
        launched_date,
        application_start_date,
        application_end_date,
        how_to_apply,
        status,
        application_portal,
        benefits,
        documents_required,
        contact_info,
        eligibility_id,
        age_min,
        age_max,
        gender,
        income_limit,
        caste_category,
        profession,
        education_qualification,
        residence_requirement
      } = formData;

      // Update scheme info
      await schemeApi.updateScheme(id, {
        scheme_name,
        category_id,
        launched_by,
        launched_date: launched_date || null,
        application_start_date: application_start_date || null,
        application_end_date: application_end_date || null,
        how_to_apply,
        status,
        application_portal,
        benefits,
        documents_required,
        contact_info
      });

      // Prepare eligibility data
      const eligibilityPayload = {
        scheme_id: id,
        age_min: age_min || null,
        age_max: age_max || null,
        gender: gender || null,
        income_limit: income_limit || null,
        caste_category: caste_category || null,
        profession: profession || null,
        education_qualification: education_qualification || null,
        residence_requirement: residence_requirement || null
      };

      // Update or create eligibility record
      if (eligibility_id) {
        await eligibilityApi.updateEligibility(eligibility_id, eligibilityPayload);
      } else {
        await eligibilityApi.createEligibility(eligibilityPayload);
      }

      alert('Scheme and eligibility updated successfully!');
      navigate('/manage-schemes');

    } catch (updateError) {
      console.error('Error while updating scheme:', updateError);
      setErrorMsg('Oops! Could not update the scheme right now.');
    }
  };

  if (loading) return <div className="loading">Loading data...</div>;

  return (
    <div className="edit-scheme-container">
      <div className="edit-scheme-card">
        <h2>Edit Scheme</h2>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form className="row g-4" onSubmit={onFormSubmit}>

          {/* Scheme Details */}
          <div className="col-md-6">
            <label htmlFor="scheme_name" className="form-label">Scheme Name</label>
            <input
              id="scheme_name"
              name="scheme_name"
              className="form-control"
              value={formData.scheme_name}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="category_id" className="form-label">Category ID</label>
            <input
              id="category_id"
              name="category_id"
              type="number"
              className="form-control"
              value={formData.category_id}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="launched_by" className="form-label">Launched By</label>
            <input
              id="launched_by"
              name="launched_by"
              className="form-control"
              value={formData.launched_by}
              onChange={onInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="launched_date" className="form-label">Launched Date</label>
            <input
              id="launched_date"
              name="launched_date"
              type="date"
              className="form-control"
              value={formData.launched_date}
              onChange={onInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="application_start_date" className="form-label">Application Start</label>
            <input
              id="application_start_date"
              name="application_start_date"
              type="date"
              className="form-control"
              value={formData.application_start_date}
              onChange={onInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="application_end_date" className="form-label">Application End</label>
            <input
              id="application_end_date"
              name="application_end_date"
              type="date"
              className="form-control"
              value={formData.application_end_date}
              onChange={onInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="how_to_apply" className="form-label">How to Apply</label>
            <input
              id="how_to_apply"
              name="how_to_apply"
              type="text"
              className="form-control"
              value={formData.how_to_apply}
              onChange={onInputChange}
              placeholder="Enter application method"
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={onInputChange}
            >
              <option>Open</option>
              <option>Closed</option>
              <option>Ongoing</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="application_portal" className="form-label">Application Portal</label>
            <input
              id="application_portal"
              name="application_portal"
              type="url"
              className="form-control"
              value={formData.application_portal}
              onChange={onInputChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="benefits" className="form-label">Benefits</label>
            <textarea
              id="benefits"
              name="benefits"
              className="form-control"
              rows="2"
              value={formData.benefits}
              onChange={onInputChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="documents_required" className="form-label">Documents Required</label>
            <textarea
              id="documents_required"
              name="documents_required"
              className="form-control"
              rows="2"
              value={formData.documents_required}
              onChange={onInputChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="contact_info" className="form-label">Contact Info</label>
            <textarea
              id="contact_info"
              name="contact_info"
              className="form-control"
              rows="2"
              value={formData.contact_info}
              onChange={onInputChange}
            />
          </div>

          {/* Eligibility Details */}
          <div className="col-md-3">
            <label htmlFor="age_min" className="form-label">Min Age</label>
            <input
              id="age_min"
              name="age_min"
              type="number"
              className="form-control"
              value={formData.age_min}
              onChange={onInputChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="age_max" className="form-label">Max Age</label>
            <input
              id="age_max"
              name="age_max"
              type="number"
              className="form-control"
              value={formData.age_max}
              onChange={onInputChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={onInputChange}
            >
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="income_limit" className="form-label">Income Limit</label>
            <input
              id="income_limit"
              name="income_limit"
              type="text"
              className="form-control"
              value={formData.income_limit}
              onChange={onInputChange}
              placeholder="e.g. <50000"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="caste_category" className="form-label">Caste Category</label>
            <input
              id="caste_category"
              name="caste_category"
              type="text"
              className="form-control"
              value={formData.caste_category}
              onChange={onInputChange}
              placeholder="e.g. SC/ST/OBC"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="profession" className="form-label">Profession</label>
            <input
              id="profession"
              name="profession"
              type="text"
              className="form-control"
              value={formData.profession}
              onChange={onInputChange}
              placeholder="e.g. Farmer, Student"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="education_qualification" className="form-label">Education Qualification</label>
            <input
              id="education_qualification"
              name="education_qualification"
              type="text"
              className="form-control"
              value={formData.education_qualification}
              onChange={onInputChange}
              placeholder="e.g. 10th Pass, Graduate"
            />
          </div>

          <div className="col-12">
            <label htmlFor="residence_requirement" className="form-label">Residence Requirement</label>
            <textarea
              id="residence_requirement"
              name="residence_requirement"
              className="form-control"
              rows="2"
              value={formData.residence_requirement}
              onChange={onInputChange}
              placeholder="e.g. Must be resident of Maharashtra"
            />
          </div>

          <div className="col-12 d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-primary">Update Scheme</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/manage-schemes')}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditScheme;
