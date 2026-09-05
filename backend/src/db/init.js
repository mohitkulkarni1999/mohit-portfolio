const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const SITE_SETTINGS_DEFAULTS = {
  site_title: 'Mohit | Software Developer',
  site_tagline: 'Crafting digital experiences with clean, scalable code.',
  seo_description: 'Portfolio of Mohit — a passionate software developer specializing in modern web technologies.',
  hero_heading: "Hi, I'm Mohit",
  hero_highlight: 'Software Developer',
  hero_subtitle: "I build elegant, fast, and scalable web applications that solve real-world problems.",
  hero_image: '',
  hero_plate_title: 'Blueprint: Mohit Portfolio',
  hero_plate_sheet: '01 / 13',
  hero_plate_height: '1.83 m',
  hero_plate_stack: 'React · Node\nSQL · Docker\nC# · AWS',
  hero_plate_tolerance: '± tolerance 0.01',
  hero_plate_scale: '🧭 Scale 1:1',
  hero_plate_dims: 'Dims in mm',
  hero_plate_rev: 'Rev A',
  show_hero_plate: true,
  primary_color: '#2563eb',
  show_about: true,
  show_stats: true,
  show_skills: true,
  show_services: true,
  show_projects: true,
  show_tools: true,
  show_experience: true,
  show_education: true,
  show_certifications: true,
  show_achievements: true,
  show_testimonials: true,
  show_blog: true,
  show_contact: true,
  order_about: 1,
  order_stats: 2,
  order_skills: 3,
  order_services: 4,
  order_projects: 5,
  order_tools: 6,
  order_experience: 7,
  order_education: 8,
  order_certifications: 9,
  order_achievements: 10,
  order_testimonials: 11,
  order_blog: 12,
  order_contact: 13,
  section_about_heading: 'About Me',
  section_about_subtitle: 'Get to know me better',
  section_stats_heading: 'My Numbers',
  section_skills_heading: 'My Skills',
  section_skills_subtitle: 'Technologies I work with',
  section_services_heading: 'What I Do',
  section_services_subtitle: 'Services I offer to help you succeed',
  section_projects_heading: 'My Projects',
  section_projects_subtitle: 'Some of my recent work',
  section_tools_heading: 'Tools & Technologies',
  section_tools_subtitle: 'The stack I use',
  section_experience_heading: 'Work Experience',
  section_experience_subtitle: 'Where I have worked',
  section_education_heading: 'Education',
  section_education_subtitle: 'My academic background',
  section_certifications_heading: 'Certifications',
  section_certifications_subtitle: 'Courses I have completed',
  section_achievements_heading: 'Achievements',
  section_achievements_subtitle: 'Things I am proud of',
  section_testimonials_heading: 'Testimonials',
  section_testimonials_subtitle: 'What people say about me',
  section_blog_heading: 'From My Blog',
  section_blog_subtitle: 'Insights and tutorials',
  section_contact_heading: 'Get In Touch',
  section_contact_subtitle: 'Let\'s work together on your next idea',
};

async function initDB() {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('Schema created successfully');

    await pool.query(`
      ALTER TABLE site_settings ALTER COLUMN setting_value TYPE JSONB
        USING CASE
          WHEN setting_value IS NULL THEN '{}'::jsonb
          WHEN setting_value::text <> '' AND setting_value::text ~ '^[\[{]' THEN setting_value::jsonb
          ELSE to_jsonb(setting_value::text)
        END
    `).catch((e) => console.log('site_settings column already JSONB'));

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING`,
      ['admin', hashedPassword]
    );

    await pool.query(
      `INSERT INTO profile (full_name, title, bio, email) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`,
      ['Mohit', 'Software Developer', 'Passionate software developer specializing in modern web technologies. I love turning complex problems into simple, beautiful, and intuitive solutions.', 'mohit@example.com']
    );

    for (const [key, value] of Object.entries(SITE_SETTINGS_DEFAULTS)) {
      await pool.query(
        `INSERT INTO site_settings (setting_key, setting_value) VALUES ($1, $2) ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value`,
        [key, JSON.stringify(typeof value === 'boolean' ? value : value)]
      );
    }

    console.log('Default data seeded');
    console.log('Default login: admin / admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err.message);
    process.exit(1);
  }
}

initDB();
