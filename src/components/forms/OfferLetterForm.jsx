import { Field, TextInput, DateInput, ComboInput } from '../Field.jsx'
import { useConfig } from '../../context/ConfigContext.jsx'

export default function OfferLetterForm({ data, set }) {
  const { config } = useConfig()
  return (
    <div className="form-grid">
      <Field label="Intern Name">
        <TextInput value={data.internName} onChange={(v) => set('internName', v)} placeholder="e.g. Seelam Harushmitha" />
      </Field>
      <Field label="Email">
        <TextInput value={data.email} onChange={(v) => set('email', v)} placeholder="name@example.com" />
      </Field>

      <Field label="Position">
        <ComboInput id="off-pos" value={data.position} onChange={(v) => set('position', v)} options={config.positionOptions} />
      </Field>
      <Field label="Department">
        <ComboInput id="off-dept" value={data.department} onChange={(v) => set('department', v)} options={config.departmentOptions} />
      </Field>

      <Field label="Reporting Manager">
        <TextInput value={data.reportingManager} onChange={(v) => set('reportingManager', v)} />
      </Field>
      <Field label="Internship Duration">
        <TextInput value={data.duration} onChange={(v) => set('duration', v)} placeholder="e.g. 6 (Six) Months" />
      </Field>

      <Field label="Start Date">
        <DateInput value={data.startDate} onChange={(v) => set('startDate', v)} />
      </Field>
      <Field label="End Date">
        <DateInput value={data.endDate} onChange={(v) => set('endDate', v)} />
      </Field>

      <Field label="Work Location">
        <TextInput value={data.workLocation} onChange={(v) => set('workLocation', v)} />
      </Field>
      <Field label="Employment Type">
        <ComboInput id="off-emp" value={data.employmentType} onChange={(v) => set('employmentType', v)} options={config.employmentTypes} />
      </Field>

      <Field label="Paid Internship?">
        <select className="input" value={data.paid ? 'yes' : 'no'} onChange={(e) => set('paid', e.target.value === 'yes')}>
          <option value="yes">Paid (show stipend)</option>
          <option value="no">Unpaid / training</option>
        </select>
      </Field>
      <Field label="Monthly Stipend" hint={data.paid ? '' : 'Disabled for unpaid internships'}>
        <TextInput value={data.stipend} onChange={(v) => set('stipend', v)} disabled={!data.paid} placeholder="INR 15,000 per month" />
      </Field>

      <Field label="Payment Schedule">
        <TextInput value={data.paymentSchedule} onChange={(v) => set('paymentSchedule', v)} disabled={!data.paid} />
      </Field>
      <Field label="Payment Mode">
        <TextInput value={data.paymentMode} onChange={(v) => set('paymentMode', v)} disabled={!data.paid} />
      </Field>

      <Field label="Pre-Placement Offer">
        <TextInput value={data.ppo} onChange={(v) => set('ppo', v)} />
      </Field>
      <Field label="Reference No.">
        <TextInput value={data.refNo} onChange={(v) => set('refNo', v)} placeholder="e.g. 5XF/OL/2026/001" />
      </Field>

      <Field label="Letter Date">
        <DateInput value={data.letterDate} onChange={(v) => set('letterDate', v)} />
      </Field>
    </div>
  )
}
