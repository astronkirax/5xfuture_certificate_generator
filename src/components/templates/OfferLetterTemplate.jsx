import { useConfig } from '../../context/ConfigContext.jsx'
import { fmtDate, tmpl } from '../../lib/format.js'
import bundledLogo from '../../assets/logo.png'
import signature from '../../assets/signature.png'

// Internship Offer Letter — 3 fixed A4 portrait pages, rebranded to 5XFUTURE
// (Mahasana = parent), structure modelled on reference/Offer Letter (1) (1).pdf.
export default function OfferLetterTemplate({ data }) {
  const { config } = useConfig()
  const { company, offerText: t } = config
  const logo = config.logoDataUrl || bundledLogo
  const vars = {
    brand: company.brandName,
    parent: company.parent,
    parentShort: company.parentShort,
    email: company.email,
    city: company.city,
  }

  const Letterhead = () => (
    <>
      <div className="letterhead">
        <div className="brand">
          <img src={logo} alt={company.brandName} crossOrigin="anonymous" />
          <div className="sub">{company.subline}</div>
        </div>
        <div className="contact">
          🌐 <b>{company.website}</b><br />
          ✉ <b>{company.email}</b><br />
          ☎ <b>{company.phone}</b>
        </div>
      </div>
      <div className="brand-rule" />
    </>
  )

  const FooterBand = ({ n }) => (
    <>
      <div className="footer-band">
        {company.brandName} is a brand of <b>{company.parent}</b>
        <span className="dot">•</span> CIN: {company.cin}
        <span className="dot">•</span> {company.website}
      </div>
      <div className="page-num">Page {n} of 3</div>
    </>
  )

  const v = (x) => x || '—'

  return (
    <>
      {/* ===================== PAGE 1 ===================== */}
      <div className="offer-sheet">
        <div className="wm"><span>5X</span></div>
        <Letterhead />
        <div className="doc-title">Internship Offer Letter</div>
        <div className="doc-subtitle">{data.position}</div>

        <div className="meta-row">
          <div>Date: <b>{fmtDate(data.letterDate) || '—'}</b></div>
          <div>Ref No.: {v(data.refNo)} &nbsp;|&nbsp; CIN: {company.cin}</div>
        </div>

        <div className="to-block">
          To,<br />
          <b>{v(data.internName)}</b><br />
          {data.email ? <>Email: {data.email}</> : null}
        </div>

        <div className="body">
          <p>Dear {data.internName ? data.internName.split(' ')[0] : 'Candidate'},</p>
          <p>{tmpl(t.intro, vars)}</p>
          <p>{tmpl(t.introSecond, vars)}</p>
        </div>

        <div className="section-title">Internship Details</div>
        <table className="dtable">
          <tbody>
            <tr><td className="k">Intern Name</td><td>{v(data.internName)}</td></tr>
            <tr><td className="k">Position</td><td>{v(data.position)}</td></tr>
            <tr><td className="k">Department</td><td>{v(data.department)}</td></tr>
            <tr><td className="k">Reporting Manager</td><td>{v(data.reportingManager)}</td></tr>
            <tr><td className="k">Internship Duration</td><td>{v(data.duration)}</td></tr>
            <tr><td className="k">Start Date</td><td>{fmtDate(data.startDate) || '—'}</td></tr>
            <tr><td className="k">End Date</td><td>{fmtDate(data.endDate) || '—'}</td></tr>
            <tr><td className="k">Work Location</td><td>{v(data.workLocation)}</td></tr>
            <tr><td className="k">Employment Type</td><td>{v(data.employmentType)}</td></tr>
          </tbody>
        </table>

        <FooterBand n={1} />
      </div>

      {/* ===================== PAGE 2 ===================== */}
      <div className="offer-sheet">
        <div className="wm"><span>5X</span></div>
        <Letterhead />

        <div className="section-title">Compensation &amp; Benefits</div>
        <table className="dtable">
          <tbody>
            {data.paid ? (
              <>
                <tr><td className="k">Monthly Stipend</td><td>{v(data.stipend)}</td></tr>
                <tr><td className="k">Payment Schedule</td><td>{v(data.paymentSchedule)}</td></tr>
                <tr><td className="k">Payment Mode</td><td>{v(data.paymentMode)}</td></tr>
              </>
            ) : (
              <tr>
                <td className="k">Stipend</td>
                <td>This is a skill-development training internship and is <strong>unpaid</strong>; no stipend is payable.</td>
              </tr>
            )}
            <tr><td className="k">Pre-Placement Offer</td><td>{v(data.ppo)}</td></tr>
          </tbody>
        </table>

        <div className="section-title">Roles &amp; Responsibilities</div>
        <div className="body"><p>As a {data.position || 'Software Development Engineer'} Intern, your primary responsibilities will include, but are not limited to:</p></div>
        <ul className="rr">
          {t.roles.map((r, i) => <li key={i}>{tmpl(r, vars)}</li>)}
        </ul>

        <div className="section-title">Working Hours &amp; Schedule</div>
        <table className="dtable">
          <tbody>
            {t.workingHours.map(([k, val], i) => (
              <tr key={i}><td className="k">{k}</td><td>{tmpl(val, vars)}</td></tr>
            ))}
          </tbody>
        </table>

        <FooterBand n={2} />
      </div>

      {/* ===================== PAGE 3 ===================== */}
      <div className="offer-sheet">
        <div className="wm"><span>5X</span></div>
        <Letterhead />

        <div className="section-title">Terms &amp; Conditions</div>
        <ul className="rr">
          {t.terms.map((r, i) => <li key={i}>{tmpl(r, vars)}</li>)}
        </ul>

        <div className="section-title">Performance Evaluation</div>
        <div className="body"><p>{tmpl(t.performanceIntro, vars)}</p></div>
        <table className="dtable center">
          <tbody>
            {t.performance.map(([k, val], i) => (
              <tr key={i}><td className="k">{k}</td><td className="v">{val}</td></tr>
            ))}
          </tbody>
        </table>

        <div className="body">
          <p>{tmpl(t.closing, vars)}</p>
          <p>{tmpl(t.closingContact, vars)}</p>
        </div>

        <div className="closing">
          <div>
            <div className="regards">Warm regards,</div>
            <div style={{ marginTop: 4, fontSize: 12, color: 'var(--ink)' }}>
              For <b style={{ color: 'var(--purple)' }}>{company.parentShort}</b>
            </div>
          </div>
          <div className="sign-right">
            <img className="sig-img" src={signature} alt="Authorised Signatory" crossOrigin="anonymous" />
            <div className="sig-cap">Authorised Signatory</div>
            <div className="sig-org">{company.parentShort}</div>
          </div>
        </div>

        <div className="acceptance">
          <div className="head">Accepted (above terms and conditions)</div>
          <p>I, <b>{v(data.internName)}</b>, hereby accept this internship offer and agree to the terms and conditions stated above.</p>
          <div className="sig-row">
            <div>Signature: <span className="ln">&nbsp;</span></div>
            <div>Date: <span className="ln">&nbsp;</span></div>
          </div>
        </div>

        <FooterBand n={3} />
      </div>
    </>
  )
}
