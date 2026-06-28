import { Field, TextInput, DateInput, ComboInput } from '../Field.jsx'
import { useConfig } from '../../context/ConfigContext.jsx'

export default function CertificateForm({ data, set }) {
  const { config } = useConfig()
  return (
    <div className="form-grid">
      <Field label="Intern Name">
        <TextInput value={data.internName} onChange={(v) => set('internName', v)} placeholder="e.g. Seelam Harushmitha" />
      </Field>

      <Field label="Course / Domain">
        <ComboInput
          id="cert-courses"
          value={data.course}
          onChange={(v) => set('course', v)}
          options={config.courseOptions}
          placeholder="Select or type a course"
        />
      </Field>

      <Field label="Start Date">
        <DateInput value={data.startDate} onChange={(v) => set('startDate', v)} />
      </Field>

      <Field label="End Date">
        <DateInput value={data.endDate} onChange={(v) => set('endDate', v)} />
      </Field>

      <Field label="Certificate No.">
        <TextInput value={data.certificateNo} onChange={(v) => set('certificateNo', v)} placeholder="e.g. 5XF/INT/2026/001" />
      </Field>

      <Field label="Date of Issue">
        <DateInput value={data.issueDate} onChange={(v) => set('issueDate', v)} />
      </Field>
    </div>
  )
}
