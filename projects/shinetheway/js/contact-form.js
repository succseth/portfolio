// React-powered contact form (uses React 18 UMD via CDN)
const { useState } = React;

function ContactForm() {
  const [data, setData] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'ok' | 'err' | null
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setData(d => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (data.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Enter a valid email";
    if (data.phone && data.phone.trim().length < 7) e.phone = "Enter a valid phone";
    if (data.message.trim().length < 10) e.message = "Tell us a little more (10+ chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setBusy(true); setStatus(null);
    // Simulated submission — in a real backend, POST to your endpoint here.
    await new Promise(r => setTimeout(r, 700));
    setBusy(false); setStatus('ok');
    setData({ name:'', email:'', phone:'', subject:'', message:'' });
  };

  return React.createElement('form', { className: 'form', onSubmit: submit, noValidate: true },
    status === 'ok' && React.createElement('div', { className: 'notice ok' }, "Thank you! We'll be in touch within 1 business day."),
    status === 'err' && React.createElement('div', { className: 'notice err' }, "Something went wrong. Please call us instead."),
    React.createElement('div', { className: 'form-row' },
      field('name', 'Your name', data.name, set('name'), errors.name),
      field('email', 'Email', data.email, set('email'), errors.email, 'email')
    ),
    React.createElement('div', { className: 'form-row' },
      field('phone', 'Phone (optional)', data.phone, set('phone'), errors.phone, 'tel'),
      field('subject', 'Subject', data.subject, set('subject'))
    ),
    React.createElement('div', { className: 'field' },
      React.createElement('label', { htmlFor: 'message' }, 'Message'),
      React.createElement('textarea', { id: 'message', rows: 5, value: data.message, onChange: set('message') }),
      React.createElement('div', { className: 'err' }, errors.message || '')
    ),
    React.createElement('button', { type: 'submit', className: 'btn btn-primary', disabled: busy },
      busy ? 'Sending…' : 'Send message')
  );
}

function field(id, label, value, onChange, err, type='text') {
  return React.createElement('div', { className: 'field', key: id },
    React.createElement('label', { htmlFor: id }, label),
    React.createElement('input', { id, type, value, onChange }),
    React.createElement('div', { className: 'err' }, err || '')
  );
}

const root = document.getElementById('contact-form-root');
if (root) ReactDOM.createRoot(root).render(React.createElement(ContactForm));
