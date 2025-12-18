-- Database: GovernmentSchemes
CREATE DATABASE GovSchemes;
drop database GovSchemes;
USE GovSchemes;

-- Users Table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Admins Table (Login only)
DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
    admins_id INT AUTO_INCREMENT PRIMARY KEY,
   admins_email VARCHAR(255) NOT NULL UNIQUE,
   admins_password_hash VARCHAR(255) NOT NULL,
    admins_name VARCHAR(100),
    failed_attempts INT DEFAULT 0,
    lock_until DATETIME NULL DEFAULT NULL,
    admins_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 admins_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


DESCRIBE admins;
SELECT failed_attempts FROM admins WHERE admins_email = "admin@example.com";

CREATE TABLE categories (
category_id INT AUTO_INCREMENT PRIMARY KEY,
category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE schemes (
scheme_id INT AUTO_INCREMENT PRIMARY KEY,
scheme_name VARCHAR(255) NOT NULL,
category_id INT,
launched_by VARCHAR(100),
launched_date DATE,
benefits TEXT,
how_to_apply    VARCHAR(255) NOT NULL DEFAULT '',
documents_required TEXT,
application_start_date  VARCHAR(100) DEFAULT NULL,
application_end_date    VARCHAR(100) DEFAULT NULL,
application_portal VARCHAR(255),
status ENUM('Open', 'Closed', 'Ongoing') DEFAULT 'Open',
contact_info TEXT,
FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);
USE GovSchemes;

ALTER TABLE schemes
  MODIFY how_to_apply    VARCHAR(255) NOT NULL DEFAULT '',
  MODIFY application_start_date  VARCHAR(100) DEFAULT NULL,
  MODIFY application_end_date    VARCHAR(100) DEFAULT NULL;

CREATE TABLE eligibility (
eligibility_id INT AUTO_INCREMENT PRIMARY KEY,
scheme_id INT,
age_min INT,
age_max INT,
gender ENUM('Any', 'Male', 'Female', 'Other') DEFAULT 'Any',
income_limit DECIMAL(10,2),
caste_category VARCHAR(50),
profession VARCHAR(100),
education_qualification VARCHAR(100),
residence_requirement VARCHAR(255),
FOREIGN KEY (scheme_id) REFERENCES schemes(scheme_id) ON DELETE CASCADE
);

USE GovSchemes;

-- 1) Create the single “Agriculture” category
INSERT INTO categories (category_name)
VALUES ('Agriculture');

SET @agri_cat_id = LAST_INSERT_ID();

-- 2) Insert all schemes with full details
INSERT INTO schemes (
  scheme_name,
  category_id,
  launched_by,
  launched_date,
  benefits,
  how_to_apply,
  documents_required,
  application_start_date,
  application_end_date,
  application_portal,
  status,
  contact_info
) VALUES
  /* 1 */ (
    'प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN)',
    @agri_cat_id,
    'Government of India',
    '2019-02-24',
    '₹6,000/year in three equal instalments',
    'Both',
    'Aadhar Card; Land-ownership docs; Bank details; Mobile number; Passport-size photo',
    NULL,
    NULL,
    'https://pmkisan.gov.in',
    'Ongoing',
    'Helpline: 155261 / 011-24300606; Email: pmkisan-ict@gov.in'
  ),
  /* 2 */ (
    'प्रधानमंत्री कृषि फसल बीमा योजना (PMFBY)',
    @agri_cat_id,
    'Government of India',
    '2016-01-01',
    'Insurance cover for crop damage due to natural calamities',
    'Annual premium payment',
    'Aadhaar Card; Land Records; Crop details',
    'Annually before sowing season',
    'Before sowing or as specified',
    'https://pmfby.gov.in',
    'Ongoing',
    'Toll-free helpline available'
  ),
  /* 3 */ (
    'प्रधानमंत्री कृषि सिंचाई योजना (PMKSY)',
    @agri_cat_id,
    'Government of India',
    '2015-07-01',
    'Improve irrigation coverage and water use efficiency',
    'Through State Agriculture Departments',
    'Aadhaar; Land docs; Bank details',
    'Ongoing',
    NULL,
    'https://pmksy.gov.in',
    'Ongoing',
    'Helpline: State Agriculture Dept'
  ),
  /* 4 */ (
    'राष्ट्रीय कृषि विकास योजना (RKVY-RAFTAAR)',
    @agri_cat_id,
    'Government of India',
    '2020-04-01',
    'Promote agri-entrepreneurship & value chains',
    'State Agriculture Departments',
    'Aadhaar; Farmer/Entrepreneur ID; Business plan',
    'Ongoing',
    NULL,
    'https://rkvy.nic.in',
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 5 */ (
    'ई-नाम (e-NAM – National Agriculture Market)',
    @agri_cat_id,
    'Government of India',
    '2016-04-14',
    'Integrated online trading platform for farmers & traders',
    'Register on e-NAM portal',
    'Aadhaar; Business Registration; Bank details',
    'Ongoing',
    NULL,
    'https://enam.gov.in',
    'Ongoing',
    'Helpline: 1800-270-0224; Email: nam@sfac.in'
  ),
  /* 6 */ (
    'मृदा स्वास्थ्य कार्ड योजना (Soil Health Card Scheme)',
    @agri_cat_id,
    'Government of India',
    '2015-02-19',
    'Soil quality report & fertilizer recommendations',
    'Local agriculture office or Gram Panchayat',
    'Aadhaar; Field details; Land proof; Mobile number',
    'Ongoing',
    NULL,
    'https://soilhealth.dac.gov.in',
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 7 */ (
    'राष्ट्रीय खाद्य सुरक्षा मिशन (NFSM)',
    @agri_cat_id,
    'Government of India',
    '2007-01-01',
    'Increase production of rice, wheat, pulses, etc.',
    'Through State Agriculture Departments',
    'Farmer ID; Aadhaar',
    'Ongoing',
    NULL,
    'https://nfsm.gov.in',
    'Ongoing',
    'Helpline available'
  ),
  /* 8 */ (
    'राष्ट्रीय सतत कृषि मिशन (NMSA)',
    @agri_cat_id,
    'Government of India',
    '2014-01-01',
    'Climate-resilient & rain-fed area development',
    'Through State Agriculture Departments',
    'Aadhaar; Land proof; Bank details',
    'Ongoing',
    NULL,
    'https://nmsa.dac.gov.in',
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 9 */ (
    'किसान क्रेडिट कार्ड (KCC)',
    @agri_cat_id,
    'Government of India',
    '1998-01-01',
    'Low-interest agricultural loans',
    'Through bank branches or CSC centers',
    'Aadhaar; Bank account details; Land docs',
    'Ongoing',
    NULL,
    NULL,
    'Ongoing',
    'Bank branch or agriculture loan helpline'
  ),
  /* 10 */ (
    'परंपरागत कृषि विकास योजना (PKVY)',
    @agri_cat_id,
    'Government of India',
    '2015-01-01',
    'Promote organic farming & marketing',
    'Through State Agriculture Departments',
    'Aadhaar; Land proof; Bank details',
    'Ongoing',
    NULL,
    'https://pkvy.nic.in',
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 11 */ (
    'प्रधानमंत्री किसान मानधन योजना (PM-KMY)',
    @agri_cat_id,
    'Government of India',
    '2019-01-01',
    '₹3,000 monthly pension after age 60',
    'Online or CSC centers',
    'Aadhaar; Bank details; Kisan ID',
    'Ongoing',
    NULL,
    'https://maandhan.in',
    'Ongoing',
    'Helpline available'
  ),
  /* 12 */ (
    'राष्ट्रीय पशुधन मिशन (NLM)',
    @agri_cat_id,
    'Government of India',
    '2014-01-01',
    'Improve livestock productivity & breeding',
    'Through State Animal Husbandry Departments',
    'Aadhaar; ID proof',
    'Ongoing',
    NULL,
    'https://dahd.nic.in',
    'Ongoing',
    'State Animal Husbandry Dept helpline'
  ),
  /* 13 */ (
    'राष्ट्रीय डेयरी विकास कार्यक्रम (NPDD)',
    @agri_cat_id,
    'Government of India',
    '2014-01-01',
    'Strengthen dairy cooperatives & infrastructure',
    'Through dairy cooperatives',
    'Organization Docs; Bank details',
    'Ongoing',
    NULL,
    'https://dahd.nic.in',
    'Ongoing',
    'Dairy Development Dept helpline'
  ),
  /* 14 */ (
    'कृषि अवसंरचना निधि (AIF)',
    @agri_cat_id,
    'Government of India',
    '2018-01-01',
    'Credit for cold storage, warehouses, etc.',
    'Online or via banks',
    'ID proof; Bank details; Land proof',
    'Ongoing',
    NULL,
    'https://agriinfra.dac.gov.in',
    'Ongoing',
    'Dept helpline'
  ),
  /* 15 */ (
    'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)',
    @agri_cat_id,
    'Government of India',
    '2019-01-01',
    'Up to 60% subsidy on solar pumps; sell surplus power',
    'Online portal or State Agri Dept',
    'Aadhaar; Land proof; Bank details',
    'Ongoing',
    NULL,
    'https://mnre.gov.in',
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 16 */ (
    'Atal Bhujal Yojana',
    @agri_cat_id,
    'Government of India',
    '2019-01-01',
    'Groundwater management & conservation',
    'State Water Dept or Panchayats',
    'Living Area proof; Aadhaar',
    'Ongoing',
    NULL,
    NULL,
    'Ongoing',
    'State Water Dept helpline'
  ),
  /* 17 */ (
    'National Mission on Natural Farming (NMNF)',
    @agri_cat_id,
    'Government of India',
    '2019-01-01',
    'Promote zero-budget natural farming',
    'Through State Agriculture Departments',
    'Aadhaar; Land proof; Bank details',
    'Ongoing',
    NULL,
    NULL,
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 18 */ (
    'National Horticulture Mission (NHM)',
    @agri_cat_id,
    'Government of India',
    '2014-01-01',
    'Support horticulture crop infrastructure',
    'Through State Horticulture Departments',
    'Aadhaar; Land proof; Bank details',
    'Ongoing',
    NULL,
    'https://nhm.gov.in',
    'Ongoing',
    'NHM helpline'
  ),
  /* 19 */ (
    'National Beekeeping and Honey Mission (NBHM)',
    @agri_cat_id,
    'Government of India',
    '2018-01-01',
    'Support beekeeping & honey processing',
    'Through beekeeping Dept / portals',
    'Aadhaar; Beekeeper ID; Bank details',
    'Ongoing',
    NULL,
    'https://nbhm.nic.in',
    'Ongoing',
    'Beekeeping Dept helpline'
  ),
  /* 20 */ (
    'National Mission on Agricultural Extension and Technology (NMAET)',
    @agri_cat_id,
    'Government of India',
    '2015-01-01',
    'Training, demos & technical support for farmers',
    'Through State Agriculture Departments',
    'Aadhaar; ID proof',
    'Ongoing',
    NULL,
    'https://agricoop.nic.in',
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 21 */ (
    'Sub-Mission on Agricultural Mechanization (SMAM)',
    @agri_cat_id,
    'Government of India',
    '2014-01-01',
    'Subsidy on purchase of farm machinery',
    'State Agriculture Depts or agencies',
    'Aadhaar; Land proof; Bank details',
    'Ongoing',
    NULL,
    'https://agrimachinery.nic.in',
    'Ongoing',
    'State Agriculture Dept helpline'
  ),
  /* 22 */ (
    'National Fisheries Development Board (NFDB)',
    @agri_cat_id,
    'Government of India',
    '2006-01-01',
    'Aid for fisheries infrastructure & training',
    'State Fisheries Dept / NFDB portal',
    'Aadhaar; Land proof; Bank details',
    'Ongoing',
    NULL,
    'https://nfdb.gov.in',
    'Ongoing',
    'State Fisheries Dept helpline'
  ),
  /* 23 */ (
    'National Animal Disease Control Programme (NADCP)',
    @agri_cat_id,
    'Government of India',
    '2019-01-01',
    'Free vaccinations & health check-ups for livestock',
    'State Animal Husbandry Dept',
    'Aadhaar; ID proof',
    'Ongoing',
    NULL,
    'https://dahd.nic.in',
    'Ongoing',
    'State Animal Husbandry Dept helpline'
  ),
  /* 24 */ (
    'National Agricultural Marketing Scheme',
    @agri_cat_id,
    'Government of India',
    '2017-01-01',
    'Market infra, price info & marketing assistance',
    'State Agricultural Marketing Boards',
    'Aadhaar; Business Regn; Bank details',
    'Ongoing',
    NULL,
    'https://agricoop.nic.in',
    'Ongoing',
    'Agri Marketing Board helpline'
  ),
  /* 25 */ (
    'Public Distribution System (PDS)',
    @agri_cat_id,
    'Government of India',
    '1947-01-01',
    'Subsidized distribution of food grains',
    'Through state-issued ration cards',
    'Ration Card; Aadhaar',
    'Ongoing',
    NULL,
    'https://nfsa.gov.in',
    'Ongoing',
    'State Food Dept helpline'
  ),
  /* 26 */ (
    'Entrepreneurship and Business Support Scheme',
    @agri_cat_id,
    'NICRA / IARI',
    NULL,
    'Support for processing, packaging & marketing agri products',
    'NICRA / IARI portals',
    'Business plan; Aadhaar; Bank details',
    'Ongoing',
    NULL,
    'https://nicra.iari.res.in',
    'Ongoing',
    'NICRA / IARI helpline'
  ),
  /* 27 */ (
    'Official Agricultural Technology Mission',
    @agri_cat_id,
    'ICAR',
    NULL,
    'Access to advanced agri technologies',
    'ICAR regional centers or portals',
    'Aadhaar; Farmer ID',
    'Ongoing',
    NULL,
    'https://icar.org.in',
    'Ongoing',
    'ICAR helpline'
  ),
  /* 28 */ (
    'Integrated Market for Agricultural Products',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Better price realization via integrated markets',
    'Register on e-NAM portal',
    'Aadhaar; Business Regn',
    'Ongoing',
    NULL,
    'https://enam.gov.in',
    'Ongoing',
    'e-NAM helpline'
  ),
  /* 29 */ (
    'Agricultural Infrastructure Fund',
    @agri_cat_id,
    'Government of India',
    '2020-01-01',
    'Aid for agri-infra development',
    'Through dairy development boards',
    'Aadhaar; Ownership proof',
    'Ongoing',
    NULL,
    'https://dairyboard.gov.in',
    'Ongoing',
    'Dairy Board helpline'
  ),
  /* 30 */ (
    'Pradhan Mantri Agricultural Credit Scheme',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Credit facilities for farmers',
    'Through banks',
    'Aadhaar; Land docs; KYC',
    'Ongoing',
    NULL,
    'https://nabard.org',
    'Ongoing',
    'NABARD helpline'
  ),
  /* 31 */ (
    'Pradhan Mantri Seed Development Scheme',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Support for seed production & quality enhancement',
    'Through seed corporation portals',
    'Aadhaar; Company Regn',
    'Ongoing',
    NULL,
    'https://seeds.gov.in',
    'Ongoing',
    'Seed Corporation helpline'
  ),
  /* 32 */ (
    'Farmer Producer Organization Scheme',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Collective marketing & better price realization',
    'Through FPO portal or agri dept',
    'Aadhaar; Group Regn docs; Bank details',
    'Ongoing',
    NULL,
    'https://fpos.gov.in',
    'Ongoing',
    'FPO helpline'
  ),
  /* 33 */ (
    'Organic Farming Incentive Scheme',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Promotion & marketing of organic products',
    'Through PKVY portal',
    'Aadhaar; Land records; Organic certification',
    'Ongoing',
    NULL,
    'https://pkvy.nic.in',
    'Ongoing',
    'PKVY helpdesk'
  ),
  /* 34 */ (
    'National Food Security Mission',
    @agri_cat_id,
    'Government of India',
    '2007-01-01',
    'Plans to boost food production',
    'State Agriculture Departments',
    'Farmer ID; Aadhaar',
    'Ongoing',
    NULL,
    'https://nfsm.gov.in',
    'Ongoing',
    'Helpline available'
  ),
  /* 35 */ (
    'National Climate Smart Agriculture Mission',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Agri reforms to combat climate change',
    'Through agriculture dept portals',
    'Aadhaar; Project docs',
    'Ongoing',
    NULL,
    'https://agricoop.nic.in',
    'Ongoing',
    'Helpline'
  ),
  /* 36 */ (
    'Pradhan Mantri Irrigation Scheme',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Support for irrigation infrastructure',
    'Through agriculture/irrigation dept',
    'Aadhaar; Land docs',
    'Ongoing',
    NULL,
    'https://pmksy.gov.in',
    'Ongoing',
    'Irrigation Dept helpline'
  ),
  /* 37 */ (
    'Pradhan Mantri Agriculture Marketing Scheme',
    @agri_cat_id,
    'Government of India',
    NULL,
    'Market development & income enhancement',
    'Through marketing board portals',
    'Aadhaar; Business Regn',
    'Ongoing',
    NULL,
    'https://agmarknet.gov.in',
    'Ongoing',
    'Marketing Board helpline'
  );

USE GovSchemes;

INSERT INTO eligibility (scheme_id)
SELECT scheme_id
  FROM schemes
 WHERE category_id = @agri_cat_id;

USE GovSchemes;

INSERT INTO eligibility (
  scheme_id,
  age_min,
  age_max,
  gender,
  income_limit,
  caste_category,
  profession,
  education_qualification,
  residence_requirement
) VALUES
  -- 1: PM-KISAN
  (1,  NULL,   NULL,     'Any', NULL, NULL,
    'Land-holding farmers (excl. doctors, engineers, lawyers)', NULL, NULL),
  -- 2: PMFBY
  (2,  NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', NULL, 'Resident of India'),
  -- 3: PMKSY
  (3,  NULL,   NULL,     'Any', NULL, NULL,
    'Land-owning farmers; Water User Associations', NULL, 'Resident of applying state'),
  -- 4: RKVY-RAFTAAR
  (4,  18,     NULL,     'Any', NULL, NULL,
    'Entrepreneurs; Agri-graduates; Farmers', 'Preferably agri graduate', 'Indian citizen'),
  -- 5: e-NAM
  (5,  18,     NULL,     'Any', NULL, NULL,
    'Farmers; Traders; Mandi officials', 'No minimum requirement', 'Indian citizen'),
  -- 6: Soil Health Card
  (6,  NULL,   NULL,     'Any', NULL, NULL,
    'किसान (भूमिधारी)', 'No requirement', NULL),
  -- 7: NFSM
  (7,  NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 8: NMSA
  (8,  NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Indian citizen'),
  -- 9: KCC
  (9,  18,     70,       'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 10: PKVY
  (10, NULL,   NULL,     'Any', NULL, NULL,
    'किसान', 'No requirement', 'भारत का निवासी होना चाहिए'),
  -- 11: PM-KMY
  (11, 18,     40,       'Any', NULL, NULL,
    'Small & marginal farmers', 'No requirement', NULL),
  -- 12: NLM
  (12, NULL,   NULL,     'Any', NULL, NULL,
    'Livestock farmers', 'No requirement', 'Resident of India'),
  -- 13: NPDD
  (13, NULL,   NULL,     'Any', NULL, NULL,
    'Dairy farmers', 'No requirement', 'Resident of India'),
  -- 14: AIF
  (14, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers; Agri-industry', 'No requirement', 'Resident of India'),
  -- 15: PM-KUSUM
  (15, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 16: Atal Bhujal Yojana
  (16, NULL,   NULL,     'Any', NULL, NULL,
    'Community stakeholders', 'No requirement', 'Resident of India'),
  -- 17: NMNF
  (17, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 18: NHM
  (18, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers engaged in horticulture', 'No requirement', 'Resident of India'),
  -- 19: NBHM
  (19, NULL,   NULL,     'Any', NULL, NULL,
    'Farmer/Beekeeper', 'No requirement', 'Resident of India'),
  -- 20: NMAET
  (20, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 21: SMAM
  (21, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 22: NFDB
  (22, NULL,   NULL,     'Any', NULL, NULL,
    'Fishermen / Aquaculture farmers', 'No requirement', 'Resident of India'),
  -- 23: NADCP
  (23, NULL,   NULL,     'Any', NULL, NULL,
    'Livestock farmers', 'No requirement', 'Resident of India'),
  -- 24: National Agri Marketing Scheme
  (24, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers; Traders', 'No requirement', 'Resident of India'),
  -- 25: PDS
  (25, NULL,   NULL,     'Any', NULL,
    'Based on BPL criteria', 'General public', 'No requirement', 'Resident of India'),
  -- 26: Entrepreneurship & Business Support
  (26, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers; Entrepreneurs', 'No specific requirement', 'Resident of India'),
  -- 27: Official Agri Tech Mission
  (27, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 28: Integrated Market for Agri Products
  (28, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers; Traders', 'No requirement', 'Resident of India'),
  -- 29: Agricultural Infrastructure Fund
  (29, NULL,   NULL,     'Any', NULL, NULL,
    'Dairy farmers', 'No requirement', 'Resident of India'),
  -- 30: PM Agri Credit Scheme
  (30, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 31: PM Seed Development Scheme
  (31, NULL,   NULL,     'Any', NULL, NULL,
    'Seed producers; Corporations', 'No requirement', 'Resident of India'),
  -- 32: Farmer Producer Organization Scheme
  (32, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers forming groups', 'No requirement', 'Resident of India'),
  -- 33: Organic Farming Incentive Scheme
  (33, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers interested in organic farming', 'No requirement', 'Resident of India'),
  -- 34: National Food Security Mission
  (34, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 35: National Climate Smart Agri Mission
  (35, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 36: Pradhan Mantri Irrigation Scheme
  (36, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India'),
  -- 37: PM Agriculture Marketing Scheme
  (37, NULL,   NULL,     'Any', NULL, NULL,
    'Farmers', 'No requirement', 'Resident of India')
; 
