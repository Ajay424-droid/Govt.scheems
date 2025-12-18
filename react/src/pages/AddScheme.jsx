import React, { useState, useEffect } from 'react';
import '../css/AddScheme.css';
import categoryApi from '../api/categoryApi';
import schemeApi from '../api/schemeApi';
import eligibilityApi from '../api/eligibilityApi';

// Inline subcomponent for adding a new category
const AddCategory = ({ onCreated }) => {
  const [catName, setCatName] = useState('');

  const createCat = async () => {
    if (!catName.trim()) return;
    try {
      await categoryApi.createCategory(null, catName);
      setCatName('');
      onCreated(); // refresh categories after creation
    } catch (err) {
      console.log('Error adding category:', err);
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label">New Category</label>
      <div className="d-flex">
        <input
          className="form-control me-2"
          placeholder="Category name"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
        <button className="btn btn-outline-secondary" onClick={createCat}>
          Add
        </button>
      </div>
    </div>
  );
};

const AddScheme = () => {
  // General scheme info
  const [schemeName, setSchemeName] = useState('');
  const [catId, setCatId] = useState('');
  const [launchedBy, setLaunchedBy] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [howToApply, setHowToApply] = useState('');
  const [status, setStatus] = useState('Open');
  const [portalLink, setPortalLink] = useState('');
  const [benefits, setBenefits] = useState('');
  const [docs, setDocs] = useState('');
  const [contact, setContact] = useState('');

  // Eligibility section
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [caste, setCaste] = useState('');
  const [job, setJob] = useState('');
  const [edu, setEdu] = useState('');
  const [residence, setResidence] = useState('');

  const [catList, setCatList] = useState([]);
  const [err, setErr] = useState('');

  // fetch categories when component mounts
  useEffect(() => {
    const loadCats = async () => {
      try {
        const res = await categoryApi.getAllCategories();
        setCatList(res);
      } catch (e) {
        console.warn('Could not load categories', e);
      }
    };
    loadCats();
  }, []);

  const resetEverything = () => {
    setSchemeName('');
    setCatId('');
    setLaunchedBy('');
    setLaunchDate('');
    setStartDate('');
    setEndDate('');
    setHowToApply('');
    setStatus('Open');
    setPortalLink('');
    setBenefits('');
    setDocs('');
    setContact('');
    setMinAge('');
    setMaxAge('');
    setGender('');
    setIncome('');
    setCaste('');
    setJob('');
    setEdu('');
    setResidence('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      // first, create the scheme itself
      const scheme = await schemeApi.createScheme({
        scheme_name: schemeName,
        category_id: catId,
        launched_by: launchedBy,
        launched_date: launchDate || null,
        benefits,
        how_to_apply: howToApply,
        documents_required: docs,
        application_start_date: startDate || null,
        application_end_date: endDate || null,
        application_portal: portalLink,
        status,
        contact_info: contact,
      });

      const newSchemeId = scheme.scheme_id;
      if (!newSchemeId) throw new Error('No scheme_id returned!');

      // now add eligibility related to that scheme
      await eligibilityApi.createEligibility({
        scheme_id: newSchemeId,
        age_min: minAge || null,
        age_max: maxAge || null,
        gender: gender || null,
        income_limit: income || null,
        caste_category: caste || null,
        profession: job || null,
        education_qualification: edu || null,
        residence_requirement: residence || null,
      });

      alert('Scheme + eligibility created!');
      resetEverything();
    } catch (err) {
      console.error(err);
      setErr(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="my-3">Add Scheme</h2>
      <AddCategory onCreated={() => categoryApi.getAllCategories().then(setCatList)} />

      <form className="row g-4" onSubmit={handleFormSubmit}>
        {/* Scheme Fields */}
        <div className="col-md-6">
          <label className="form-label">Scheme Name</label>
          <input className="form-control" value={schemeName} onChange={e => setSchemeName(e.target.value)} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select className="form-select" value={catId} onChange={e => setCatId(e.target.value)} required>
            <option value="">-- Select Category --</option>
            {catList.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* More fields... keeping it short */}
        <div className="col-md-6">
          <label className="form-label">Launched By</label>
          <input className="form-control" value={launchedBy} onChange={e => setLaunchedBy(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Launch Date</label>
          <input type="date" className="form-control" value={launchDate} onChange={e => setLaunchDate(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">How to Apply</label>
          <input className="form-control" value={howToApply} onChange={e => setHowToApply(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option>Open</option>
            <option>Closed</option>
            <option>Ongoing</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Application Portal</label>
          <input className="form-control" type="url" value={portalLink} onChange={e => setPortalLink(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Benefits</label>
          <textarea className="form-control" value={benefits} onChange={e => setBenefits(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Documents Required</label>
          <textarea className="form-control" value={docs} onChange={e => setDocs(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Contact Info</label>
          <textarea className="form-control" value={contact} onChange={e => setContact(e.target.value)} />
        </div>

        {/* Eligibility */}
        <div className="col-md-3">
          <label className="form-label">Min Age</label>
          <input className="form-control" type="number" value={minAge} onChange={e => setMinAge(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Max Age</label>
          <input className="form-control" type="number" value={maxAge} onChange={e => setMaxAge(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Gender</label>
          <select className="form-select" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="">Any</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Income Limit</label>
          <input className="form-control" type="number" value={income} onChange={e => setIncome(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Caste</label>
          <input className="form-control" value={caste} onChange={e => setCaste(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Profession</label>
          <input className="form-control" value={job} onChange={e => setJob(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Education</label>
          <input className="form-control" value={edu} onChange={e => setEdu(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Residence</label>
          <input className="form-control" value={residence} onChange={e => setResidence(e.target.value)} />
        </div>

        {/* error message */}
        {err && <div className="col-12 text-danger">{err}</div>}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Submit Scheme</button>
        </div>
      </form>
    </div>
  );
};

export default AddScheme;
