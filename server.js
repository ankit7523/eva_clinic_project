// Load environment variables (optional)
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

/* -------------------- Middleware -------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* -------------------- View Engine (EJS) -------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* -------------------- Default Title -------------------- */
app.use((req, res, next) => {
  res.locals.title = 'EVA CLINIC – Best Hair Transplant in Lucknow';
  next();
});

/* -------------------- Helper for Simple Pages -------------------- */
function page(routePath, viewFile, title) {
  app.get(routePath, (req, res) => {
    res.render(viewFile, { title });
  });
}

/* -------------------- Static Page Routes -------------------- */
page('/', 'index', 'Home – EVA CLINIC');
page('/about', 'about', 'About Us – EVA CLINIC');
page('/services', 'services', 'Services – EVA CLINIC');
page('/results', 'results', 'Results – EVA CLINIC');
page('/videos', 'videos', 'Videos – EVA CLINIC');
page('/blog', 'blog', 'Blog – EVA CLINIC');
page('/hair-transplant', 'hair-transplant', 'Hair Transplant – EVA CLINIC');

/* -------------------- Contact Page -------------------- */
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us – EVA CLINIC' });
});

/* -------------------- 404 Handler -------------------- */
app.use((req, res) => {
  if (req.accepts('html')) {
    return res
      .status(404)
      .render('404', { title: 'Not Found – EVA CLINIC' });
  }
  res.status(404).json({ ok: false, message: 'Not found' });
});

/* -------------------- Start Server -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
