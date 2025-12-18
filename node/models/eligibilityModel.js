// models/eligibility.js
const db = require("../config/db");

const Eligibility = {
  create: async ({ scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement }) => {
    const query = `INSERT INTO eligibility
      (scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement)
      VALUES (?,?,?,?,?,?,?,?,?)`;
    const params = [scheme_id, age_min, age_max, gender, income_limit, caste_category, profession, education_qualification, residence_requirement];
    return db.execute(query, params);
  },

  findByEligibilityId: async (eligibility_id) => {
    const query = 'SELECT * FROM eligibility WHERE eligibility_id = ?';
    const [rows] = await db.execute(query, [eligibility_id]);
    return rows;
  },

  findBySchemeId: async (scheme_id) => {
    const query = 'SELECT * FROM eligibility WHERE scheme_id = ?';
    const [rows] = await db.execute(query, [scheme_id]);
    return rows;
  },

  update: async (eligibility_id, data) => {
    const fields = [];
    const params = [];
    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = ?`);
      params.push(value);
    }
    params.push(eligibility_id);
    const query = `UPDATE eligibility SET ${fields.join(', ')} WHERE eligibility_id = ?`;
    return db.execute(query, params);
  },

  delete: async (eligibility_id) => {
    const query = 'DELETE FROM eligibility WHERE eligibility_id = ?';
    return db.execute(query, [eligibility_id]);
  }
};

module.exports = Eligibility;
