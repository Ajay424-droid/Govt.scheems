// models/eligibility.js
const db = require("../config/db");

const Eligibility = {
  create: async ({ scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement }) => {
    const query = `INSERT INTO eligibility
      (scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
    const params = [scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement];
    return db.query(query, params);
  },

  findByEligibilityId: async (eligibility_id) => {
    const query = 'SELECT * FROM eligibility WHERE eligibility_id = $1';
    const { rows } = await db.query(query, [eligibility_id]);
    return rows;
  },

  findBySchemeId: async (scheme_id) => {
    const query = 'SELECT * FROM eligibility WHERE scheme_id = $1';
    const { rows } = await db.query(query, [scheme_id]);
    return rows;
  },

  update: async (eligibility_id, data) => {
    const fields = [];
    const params = [];
    let i = 1;
    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${i}`);
      params.push(value);
      i++;
    }
    params.push(eligibility_id);
    const query = `UPDATE eligibility SET ${fields.join(', ')} WHERE eligibility_id = $${i}`;
    return db.query(query, params);
  },

  delete: async (eligibility_id) => {
    const query = 'DELETE FROM eligibility WHERE eligibility_id = $1';
    return db.query(query, [eligibility_id]);
  }
};

module.exports = Eligibility;
