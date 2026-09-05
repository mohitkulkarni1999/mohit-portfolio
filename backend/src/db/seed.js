const pool = require('../config/db');

async function seed() {
  const empty = async (t) => pool.query(`TRUNCATE ${t} RESTART IDENTITY CASCADE`).catch(() => {});
  await empty('skills');
  await empty('projects');
  await empty('experience');
  await empty('education');
  await empty('certificates');
  await empty('services');
  await empty('testimonials');
  await empty('stats');
  await empty('tools');
  await empty('achievements');
  await empty('blog_posts');

  const skills = [
    ['TypeScript', 'technical', 92, 'code'], ['JavaScript', 'technical', 95, 'code'],
    ['React', 'frontend', 94, 'code'], ['Next.js', 'frontend', 88, 'code'],
    ['Tailwind CSS', 'frontend', 96, 'code'], ['Redux', 'frontend', 85, 'code'],
    ['Node.js', 'backend', 90, 'server'], ['Express', 'backend', 89, 'server'],
    ['PostgreSQL', 'database', 87, 'database'], ['MongoDB', 'database', 84, 'database'],
    ['Redis', 'database', 78, 'database'], ['AWS', 'cloud', 82, 'cloud'],
    ['Docker', 'devops', 80, 'container'], ['CI/CD', 'devops', 83, 'cloud'],
    ['Git', 'tools', 93, 'git'], ['Figma', 'design', 75, 'palette'],
  ];
  for (const [name, category, proficiency, icon] of skills) {
    await pool.query('INSERT INTO skills (name, category, proficiency, icon) VALUES ($1,$2,$3,$4)', [name, category, proficiency, icon]);
  }

  const projects = [
    ['E-Commerce Platform', 'Full-featured online store with payments and admin panel.', 'Built with React, Node.js, and Stripe integration featuring real-time inventory, order tracking, and a comprehensive seller dashboard.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'https://demo.example.com', 'https://github.com/example/ecommerce', ['React', 'Node.js', 'Stripe', 'PostgreSQL'], true, 1],
    ['Task Management App', 'Kanban-style project management tool with real-time sync.', 'A collaborative task board with drag-and-drop, team workspaces, comments, and notifications powered by WebSockets.', '', 'https://demo.example.com', 'https://github.com/example/taskapp', ['TypeScript', 'Next.js', 'WebSockets'], true, 2],
    ['AI Chat Assistant', 'Conversational AI assistant integrated with LLMs.', 'An intelligent chat assistant that can answer questions, generate content, and automate workflows using the latest language models.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', '', 'https://github.com/example/ai-assistant', ['Python', 'OpenAI', 'FastAPI'], true, 3],
    ['Analytics Dashboard', 'Real-time data visualization dashboard.', 'Beautiful analytics platform presenting complex data as clear, interactive charts with customizable reporting.', '', '', 'https://github.com/example/analytics', ['React', 'D3.js', 'PostgreSQL'], false, 4],
    ['DevOps Monitor', 'Server monitoring and alerting system.', 'Real-time monitoring of servers, containers, and applications with instant alerting and uptime tracking.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', '', '', ['Go', 'Docker', 'Grafana'], false, 5],
  ];
  for (const [title, description, long_description, image_url, demo_url, github_url, tags, featured, sort_order] of projects) {
    await pool.query(
      'INSERT INTO projects (title, description, long_description, image_url, demo_url, github_url, tags, featured, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [title, description, long_description, image_url, demo_url, github_url, tags, featured, sort_order]
    );
  }

  const experience = [
    ['TechCorp Ltd.', 'Senior Software Engineer', 'Leading a team of 6 engineers building scalable microservices. Architected systems handling 1M+ daily requests and improved performance by 40%.', '2022-01-15', null, true, 'Bengaluru, India', 1],
    ['CloudNine Solutions', 'Software Developer', 'Developed full-stack web applications for enterprise clients. Implemented RESTful APIs, optimized database queries, and shipped 20+ features.', '2020-06-01', '2021-12-31', false, 'Pune, India', 2],
    ['Startup Hub', 'Junior Developer', 'Built responsive frontends and assisted in back-end development. Collaborated in agile sprints and contributed to open-source projects.', '2019-02-01', '2020-05-31', false, 'Remote', 3],
  ];
  for (const [company, position, description, start_date, end_date, is_current, location, sort_order] of experience) {
    await pool.query(
      'INSERT INTO experience (company, position, description, start_date, end_date, is_current, location, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      [company, position, description, start_date, end_date, is_current, location, sort_order]
    );
  }

  const education = [
    ['Indian Institute of Technology', 'B.Tech in Computer Science', 'Computer Science & Engineering', '2015-07-01', '2019-05-31', 'CGPA: 8.7/10', 'Specialized in software engineering, data structures, and distributed systems. Led the coding club and won multiple hackathons.', 1],
  ];
  for (const [institution, degree, field_of_study, start_date, end_date, grade, description, sort_order] of education) {
    await pool.query(
      'INSERT INTO education (institution, degree, field_of_study, start_date, end_date, grade, description, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      [institution, degree, field_of_study, start_date, end_date, grade, description, sort_order]
    );
  }

  const certificates = [
    ['AWS Certified Solutions Architect', 'Amazon Web Services', 'Advanced certification covering cloud architecture, deployment, and security best practices.', '2021-08-10', 'https://www.credly.com/badges/example', '', 1],
    ['Google Cloud Professional Developer', 'Google', 'Professional certification validating expertise in designing and building cloud applications on GCP.', '2022-03-15', 'https://www.credential.net/example', '', 2],
    ['Meta Front-End Developer', 'Coursera', 'Comprehensive course covering modern front-end development with React and advanced JavaScript.', '2023-01-20', '', '', 3],
  ];
  for (const [title, issuer, description, date_earned, credential_url, image_url, sort_order] of certificates) {
    await pool.query(
      'INSERT INTO certificates (title, issuer, description, date_earned, credential_url, image_url, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [title, issuer, description, date_earned, credential_url, image_url, sort_order]
    );
  }

  const services = [
    ['Web Development', 'Building fast, responsive, and scalable web applications using modern frameworks and best practices.', 'code', ['React & Next.js', 'Node.js APIs', 'Responsive UI'], 1],
    ['API Development', 'Designing and implementing robust RESTful and GraphQL APIs that power your products.', 'server', ['REST & GraphQL', 'Authentication', 'Documentation'], 2],
    ['Database Design', 'Creating efficient, secure database architectures optimized for performance and growth.', 'database', ['Schema Design', 'Query Optimization', 'Data Modeling'], 3],
    ['Cloud Deployment', 'Deploying and managing applications on AWS and other cloud platforms with CI/CD pipelines.', 'cloud', ['AWS & GCP', 'Docker & K8s', 'CI/CD'], 4],
    ['UI/UX Enhancements', 'Polishing your product with clean, intuitive interfaces and delightful user experiences.', 'palette', ['Design Systems', 'Tailwind CSS', 'Accessibility'], 5],
    ['Technical Consulting', 'Providing expert guidance on architecture, code quality, and engineering processes.', 'lightbulb', ['Architecture Review', 'Code Audits', 'Mentoring'], 6],
  ];
  for (const [title, description, icon, features, sort_order] of services) {
    await pool.query(
      'INSERT INTO services (title, description, icon, features, sort_order) VALUES ($1,$2,$3,$4,$5)',
      [title, description, icon, features, sort_order]
    );
  }

  const testimonials = [
    ['Sarah Johnson', 'Product Manager', 'Acme Corp', 'Mohit is one of the most talented developers I have worked with. He delivered our platform ahead of schedule with exceptional quality and attention to detail.', '', 5, 1],
    ['David Chen', 'Founder', 'StartupX', 'Incredible problem solver. He turned our vague idea into a polished, production-ready product that our users love. Highly recommended.', '', 5, 2],
    ['Priya Sharma', 'CTO', 'CloudNine', 'Exceptionally skilled and reliable. His code is clean, well-documented, and performant. A true asset to any engineering team.', '', 5, 3],
  ];
  for (const [name, role, company, message, avatar_url, rating, sort_order] of testimonials) {
    await pool.query(
      'INSERT INTO testimonials (name, role, company, message, avatar_url, rating, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [name, role, company, message, avatar_url, rating, sort_order]
    );
  }

  const stats = [
    ['Years Experience', '5', '+', 'briefcase', 1],
    ['Projects Completed', '60', '+', 'folder', 2],
    ['Happy Clients', '40', '+', 'users', 3],
    ['Open Source Commits', '1200', '+', 'git', 4],
  ];
  for (const [label, value, suffix, icon, sort_order] of stats) {
    await pool.query('INSERT INTO stats (label, value, suffix, icon, sort_order) VALUES ($1,$2,$3,$4,$5)', [label, value, suffix, icon, sort_order]);
  }

  const tools = [
    ['VS Code', 'Developer', 'Primary code editor', '', 1], ['GitHub', 'Development', 'Version control', '', 2],
    ['Docker', 'DevOps', 'Containerization', '', 3], ['Figma', 'Design', 'UI/UX design', '', 4],
    ['Postman', 'API', 'API testing', '', 5], ['npm', 'Development', 'Package manager', '', 6],
    ['Webpack', 'Development', 'Module bundler', '', 7], ['Linux', 'OS', 'Development OS', '', 8],
  ];
  for (const [name, category, description, icon_url, sort_order] of tools) {
    await pool.query('INSERT INTO tools (name, category, description, icon_url, sort_order) VALUES ($1,$2,$3,$4,$5)', [name, category, description, icon_url, sort_order]);
  }

  const achievements = [
    ['Winner - National Hackathon 2022', 'Led a team of 4 to win first place out of 200+ teams with an innovative healthcare solution.', '2022-11-15', 'TechFest', 'award', 1],
    ['Top Performer Award', 'Recognized as top 1% performer for outstanding contribution to product development.', '2021-07-20', 'TechCorp', 'trophy', 2],
    ['Open Source Contributor', 'Made 1200+ commits and merged 300+ PRs into popular open source projects.', '2023-03-10', 'GitHub', 'code', 3],
  ];
  for (const [title, description, date_awarded, issuer, icon, sort_order] of achievements) {
    await pool.query('INSERT INTO achievements (title, description, date_awarded, issuer, icon, sort_order) VALUES ($1,$2,$3,$4,$5,$6)', [title, description, date_awarded, issuer, icon, sort_order]);
  }

  const blog = [
    ['Why I Switched from JavaScript to TypeScript', 'TypeScript has transformed the way I build applications. Here is why you should consider it too.', 'Learning TypeScript changed my development workflow completely. Type safety catches bugs before they happen and makes refactoring a breeze. In this post, I share my journey and the key benefits...', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800', ['TypeScript', 'JavaScript', 'Best Practices'], true, 7, '2023-05-12'],
    ['A Practical Guide to PostgreSQL Performance', 'Tips and tricks for optimizing your PostgreSQL database for speed and scale.', 'PostgreSQL is a powerful database, but like any tool, it needs to be tuned. This guide covers indexing strategies, query optimization, and connection pooling...', '', ['PostgreSQL', 'Performance', 'Database'], true, 6, '2023-04-20'],
    ['Designing Scalable REST APIs', 'Best practices for designing APIs that can grow with your application.', 'A well-designed API is the backbone of any modern application. Here are the principles I follow to build APIs that are scalable, secure, and developer-friendly...', '', ['API', 'Node.js', 'Architecture'], true, 5, '2023-03-08'],
  ];
  for (const [title, excerpt, content, cover_image, tags, published, read_minutes, created_at] of blog) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await pool.query(
      'INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, tags, published, read_minutes, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [title, slug, excerpt, content, cover_image, tags, published, read_minutes, created_at]
    );
  }

  console.log('Sample data seeded successfully');
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
