# 5XFUTURE — Document Generator

A small website to generate **Internship Certificates** and **Offer Letters** as
downloadable PDFs. Pick a document, fill in the student's details, click **Generate &
Download PDF** — the finished A4 PDF saves straight to your computer.

5XFUTURE is a brand of **Mahasana IT Solutions Private Limited** (CIN U62010AP2023PTC113188).

## How to run it

You need **Node.js** installed (https://nodejs.org — the LTS version).

```bash
npm install      # first time only — installs dependencies
npm run dev      # start the app, then open the printed http://localhost:5173 link
```

To build a static version you can host (Netlify, GitHub Pages, etc.):

```bash
npm run build    # output goes to the dist/ folder
npm run preview  # preview the built version locally
```

## Using the app

- **Internship Certificate** tab — enter intern name, course/domain, dates, certificate
  number and issue date. The preview updates live; click Generate for a 1-page landscape PDF.
- **Offer Letter** tab — enter the intern's details (position, department, manager,
  duration, dates, stipend, etc.). Toggle **Paid / Unpaid** to show or hide the stipend.
  Click Generate for a 3-page portrait PDF.
- **Template Editor** tab — change brand colours, upload a new logo, edit company details,
  the dropdown option lists, and all boilerplate text (certificate wording, offer-letter
  intro, roles, terms, performance criteria, closing). Changes preview instantly, apply to
  generated PDFs, and are **saved automatically in your browser**. Use **Reset** on any
  section (or **Reset everything**) to restore the defaults.

## Project structure

```
index.html                 Vite entry
src/
  App.jsx                  tabs, form state, Generate handler
  data/defaults.js         brand config, dropdown options, all editable boilerplate
  context/ConfigContext.jsx  loads/saves config in localStorage, sets brand CSS vars
  lib/pdf.js               html2canvas + jsPDF capture & auto-download
  lib/fonts.js, format.js  helpers
  components/
    templates/CertificateTemplate.jsx   exact port of the original certificate design
    templates/OfferLetterTemplate.jsx   3-page offer letter (modelled on the reference PDF)
    forms/                  the input forms
    PreviewPane.jsx         scales the A4 document to fit the screen
    TemplateEditor.jsx      the editor
  styles/documents.css      the document (print) styles
  styles/global.css         the website UI styles
  assets/                   logo + signature images
reference/                  original HTML/DOCX templates, build scripts, reference PDF
```

The original templates and the reference offer-letter PDF are kept in `reference/` for
comparison; they are not used by the running app.
