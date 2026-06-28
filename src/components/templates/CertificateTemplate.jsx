import { useConfig } from '../../context/ConfigContext.jsx'
import { fmtDate } from '../../lib/format.js'
import bundledLogo from '../../assets/logo.png'
import signatureMark from '../../assets/signature-mark.png'

// Renders the Internship Certificate at true A4 landscape size.
// Mirrors reference/internship-certificate.html exactly.
export default function CertificateTemplate({ data }) {
  const { config } = useConfig()
  const { company, certificateText: t } = config
  const logo = config.logoDataUrl || bundledLogo

  const blank = (v, cls = '') =>
    v ? <span className={`fillv ${cls}`}>{v}</span> : <span className={`fillv ${cls}`}>&nbsp;</span>

  return (
    <div className="certificate">
      <div className="frame-outer" />
      <div className="frame-inner" />
      <div className="watermark"><span>5X</span></div>
      <div className="corner tl" />
      <div className="corner tr" />
      <div className="corner bl" />
      <div className="corner br" />

      <div className="content">
        <div className="brand">
          <img src={logo} alt={company.brandName} crossOrigin="anonymous" />
          <div className="brand-sub">{company.subline}</div>
        </div>

        <div className="rule" />

        <div className="title">{t.title}</div>
        <div className="subtitle">{t.subtitle}</div>

        <div className="presented">{t.presented}</div>
        <div className="name-line">
          <span className="value">{data.internName || ' '}</span>
        </div>
        <div className="field-label">Name of the Intern</div>

        <div className="body-text">
          {t.bodyLead} {blank(data.course)} {t.bodyAt}{' '}
          <strong>
            {company.brandName} Software Training Institute, {company.city}
          </strong>
          , from {blank(fmtDate(data.startDate), 'sm')} to {blank(fmtDate(data.endDate), 'sm')}. {t.bodyAfter}
        </div>

        <div className="footer">
          <div className="sign">
            <div className="ink-line" />
            <div className="role">Training Head</div>
            <div className="org">{company.brandName}, {company.city}</div>
          </div>

          <div className="seal">
            <div className="medallion">
              <div className="seal-inner"><span className="x5">5X</span>FUTURE<br />CERTIFIED</div>
            </div>
            <div className="ribbon"><span /><span /></div>
          </div>

          <div className="sign sign-director">
            <img className="sig-on-line" src={signatureMark} alt="Director" crossOrigin="anonymous" />
            <div className="ink-line" />
            <div className="org">{company.parentShort}</div>
          </div>
        </div>

        <div className="meta">
          <div>Certificate No. : {blank(data.certificateNo, 'sm')}</div>
          <div>Date of Issue : {blank(fmtDate(data.issueDate), 'sm')}</div>
        </div>

        <div className="legal">
          {company.brandName} is a brand of <b>{company.parent}</b> (CIN: {company.cin})
          &nbsp;|&nbsp; {company.email} &nbsp;|&nbsp; {company.phone} &nbsp;|&nbsp; {company.website}
        </div>
      </div>
    </div>
  )
}
