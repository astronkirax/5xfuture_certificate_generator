// Central source of truth for everything editable in the app.
// The Template Editor overrides these and persists the result in localStorage;
// `defaults` is always available for "Reset to defaults".

export const BRAND = {
  // Brand palette sampled from the 5XFUTURE logo
  purple: '#3A266D',
  purpleDeep: '#2A1B52',
  purpleSoft: '#4A3488',
  orange: '#F58220',
  orangeDeep: '#D96E12',
  orangeLight: '#F9A35A',
  cream: '#FBF8F2',
  ink: '#2B2347',
  muted: '#6E6688',
  placeholder: '#C3BDD2',
}

export const COMPANY = {
  brandName: '5XFUTURE',
  tagline: 'Learn Today. Lead Tomorrow.',
  subline: 'Software Training Institute  •  Kakinada',
  parent: 'Mahasana IT Solutions Private Limited',
  parentShort: 'Mahasana IT Solutions Pvt. Ltd.',
  cin: 'U62010AP2023PTC113188',
  website: '5xfuture.in',
  email: 'contact@5xfuture.in',
  phone: '+91 96401 31555',
  city: 'Kakinada',
}

// Dropdown options (editable in the Template Editor)
export const COURSE_OPTIONS = [
  'Artificial Intelligence (AI)',
  'Full Stack Development',
  'Data Science',
  'Machine Learning',
  'Web Development',
  'Python Programming',
  'Java Full Stack',
  'Cloud Computing',
]

export const POSITION_OPTIONS = [
  'Software Development Engineer (SDE) Intern',
  'Full Stack Developer Intern',
  'Data Science Intern',
  'AI/ML Engineer Intern',
  'Frontend Developer Intern',
  'Backend Developer Intern',
]

export const DEPARTMENT_OPTIONS = [
  'Product Engineering',
  'Software Development',
  'Data Science',
  'AI Research',
  'Cloud & DevOps',
]

export const EMPLOYMENT_TYPES = [
  'Full-Time Internship',
  'Part-Time Internship',
  'Remote Internship',
  'Hybrid Internship',
]

// ---- Editable boilerplate text ----

export const CERTIFICATE_TEXT = {
  title: 'Certificate of Internship',
  subtitle: 'Of Successful Completion',
  presented: 'This certificate is proudly presented to',
  // {course}, {start}, {end} are substituted at render time
  bodyLead: 'for successfully completing the internship programme in',
  bodyAt: 'at',
  // sentence that follows the dates
  bodyAfter:
    'During the internship, the intern worked on real-time projects and demonstrated exemplary technical skill, discipline, and professionalism. We commend this achievement and wish the intern continued success ahead.',
}

export const OFFER_TEXT = {
  intro:
    'We are delighted to extend this offer of internship to you at {brand}, a brand of {parent}. Following a thorough evaluation of your academic achievements, technical skills, and performance during the selection process, we are confident that you will be a valuable addition to our engineering team.',
  introSecond:
    'Please review the details of this offer carefully. Should you have any questions or require clarification on any aspect of this letter, do not hesitate to contact our Human Resources department.',
  roles: [
    'Design, develop, and test software components as assigned by your team lead.',
    'Collaborate with cross-functional teams including Product, QA, and DevOps to deliver high-quality software solutions.',
    'Participate in code reviews, sprint planning, stand-ups, and retrospective meetings.',
    'Write clean, efficient, and well-documented code following company coding standards.',
    'Identify, debug, and resolve software defects and performance bottlenecks.',
    'Contribute to technical documentation, including design documents and API specifications.',
    'Learn and apply emerging technologies relevant to the team’s tech stack.',
    'Present progress updates and demos to stakeholders at the end of each sprint.',
    'Learn to design systems for high performance, reliability, and scalability.',
    'Any other roles and responsibilities may be assigned by the company from time to time depending on the business requirements.',
  ],
  workingHours: [
    ['Working Days', 'Monday to Friday (5 days/week)'],
    ['Working Hours', '09:00 AM – 06:00 PM (with 1-hour lunch break)'],
    ['Total Hours/Week', '40 Hours per week'],
    ['Leaves / Holidays', 'As per company holiday calendar'],
  ],
  terms: [
    'This internship is for the fixed period stated above and will not automatically convert into full-time employment unless a Pre-Placement Offer (PPO) is explicitly extended in writing.',
    'The intern is expected to maintain strict confidentiality regarding all proprietary, technical, business, and client information accessed during the internship period, both during and after the tenure.',
    'All work products, code, designs, and inventions created during the internship shall be the sole intellectual property of {parent}.',
    'The intern must adhere to the company’s Code of Conduct, IT Security Policy, and all other applicable company policies.',
    'Either party may terminate this internship with a written notice of seven (7) calendar days.',
    'The intern must not engage in any other employment or internship that conflicts with the interests of {parent} during this period.',
    'Satisfactory performance will result in the issuance of an official Internship Completion Certificate and a LinkedIn recommendation from the reporting manager.',
    'This offer is conditional upon successful completion of background verification and submission of required documents.',
  ],
  performance: [
    ['Technical Proficiency & Code Quality', '35%'],
    ['Problem Solving & Analytical Thinking', '25%'],
    ['Collaboration & Communication', '20%'],
    ['Learning Agility & Initiative', '20%'],
  ],
  performanceIntro:
    'Your performance will be evaluated on a mid-term and a final basis by your Reporting Manager. Evaluations will cover the following dimensions:',
  closing:
    'We are thrilled at the prospect of having you on our team. At {brand}, we are committed to building a culture that fosters learning, innovation, and excellence. We trust this internship will be a meaningful and enriching experience in your professional journey.',
  closingContact:
    'We look forward to welcoming you. Please do not hesitate to reach out to us at {email} for any questions.',
}

// Default form values (pre-filled, drawn from the reference PDF)
export const CERTIFICATE_DEFAULTS = {
  internName: '',
  course: COURSE_OPTIONS[0],
  startDate: '',
  endDate: '',
  certificateNo: '',
  issueDate: '',
}

export const OFFER_DEFAULTS = {
  internName: '',
  email: '',
  position: POSITION_OPTIONS[0],
  department: DEPARTMENT_OPTIONS[0],
  reportingManager: 'Ravi Teja – Senior Software Development Engineer',
  duration: '6 (Six) Months',
  startDate: '',
  endDate: '',
  workLocation: 'Hyderabad',
  employmentType: EMPLOYMENT_TYPES[0],
  paid: true,
  stipend: 'INR 15,000 per month',
  paymentSchedule: 'Monthly, on the last working day of each month',
  paymentMode: 'Bank Transfer (NEFT / Direct Deposit)',
  ppo: 'High performers may be considered for a full-time PPO',
  refNo: '',
  letterDate: '',
}

// The full editable configuration object stored in localStorage
export const DEFAULT_CONFIG = {
  brand: BRAND,
  company: COMPANY,
  courseOptions: COURSE_OPTIONS,
  positionOptions: POSITION_OPTIONS,
  departmentOptions: DEPARTMENT_OPTIONS,
  employmentTypes: EMPLOYMENT_TYPES,
  certificateText: CERTIFICATE_TEXT,
  offerText: OFFER_TEXT,
  logoDataUrl: null, // when set (data URL), overrides the bundled logo
}
