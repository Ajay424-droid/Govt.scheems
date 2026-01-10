// models/scheme.js
const db = require("../config/db");

const Scheme = {
  create: async ({ scheme_name, category_id, launched_by, launched_date, benefits, how_to_apply, documents_required, application_start_date, application_end_date, application_portal, status, contact_info }) => {
    const query = `INSERT INTO schemes
      (scheme_name, category_id, launched_by, launched_date, benefits, how_to_apply, documents_required, application_start_date, application_end_date, application_portal, status, contact_info)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;
    const params = [scheme_name, category_id, launched_by, launched_date, benefits, how_to_apply, documents_required, application_start_date, application_end_date, application_portal, status, contact_info];
    return db.query(query, params);
  },

  findById: async (scheme_id) => {
    const query = 'SELECT * FROM schemes WHERE scheme_id = $1';
    const { rows } = await db.query(query, [scheme_id]);
    return rows;
  },
  // models/scheme.js
  findByCategoryId: async (category_id) => {
    const query = 'SELECT * FROM schemes WHERE category_id = $1';
    return db.query(query, [category_id]);
  },

  findAll: async () => {
    const query = 'SELECT * FROM schemes';
    const { rows } = await db.query(query);
    return rows;
  },

  update: async (scheme_id, data) => {
    const fields = [];
    const params = [];
    let i = 1;
    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${i}`);
      params.push(value);
      i++;
    }
    params.push(scheme_id);
    const query = `UPDATE schemes SET ${fields.join(', ')} WHERE scheme_id = $${i}`;
    return db.query(query, params);
  },

  delete: async (scheme_id) => {
    const query = 'DELETE FROM schemes WHERE scheme_id = $1';
    return db.query(query, [scheme_id]);
  }
};

module.exports = Scheme;
