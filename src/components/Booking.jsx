import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Video, Camera, Radio, Scissors, Settings,
  ArrowRight, ArrowLeft, Check, CheckCircle2, Calendar, AlertCircle, Send,
} from 'lucide-react';
import SectionHeading from './primitives/SectionHeading';
import AmbientOrb from './primitives/AmbientOrb';
import SmartImage from './primitives/SmartImage';
import { SERVICE_PILLS, BUDGET_RANGES, BRAND } from '../data/site';
import { getMedia } from '../data/media';
import { EASE } from '../lib/motion';

const ICONS = { Video, Camera, Radio, Scissors, Settings };

const STEPS = [
  { id: 1, label: 'Scope' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Contact' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared input styling, kept in one place so every field matches exactly. */
const fieldClass =
  'w-full rounded-lg border border-white/12 bg-obsidian-950/60 px-4 py-3 text-sm text-white placeholder:text-ash transition-colors duration-300 focus:border-ember-glow/50 focus:outline-none focus:ring-1 focus:ring-ember-glow/30';

const labelClass = 'mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mist';

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-red-400">
      <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    services: [],
    date: '',
    budget: '',
    organisation: '',
    scope: '',
    name: '',
    email: '',
    phone: '',
  });

  const media = getMedia('booking');
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const update = useCallback((key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Clear a field's error as soon as the user starts correcting it.
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }, []);

  const toggleService = useCallback((id) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }));
    setErrors((e) => {
      if (!e.services) return e;
      const next = { ...e };
      delete next.services;
      return next;
    });
  }, []);

  /** Validate only the fields belonging to the step being left. */
  const validateStep = useCallback((target) => {
    const next = {};
    if (target === 1) {
      if (form.services.length === 0) next.services = 'Choose at least one service.';
    }
    if (target === 2) {
      if (!form.scope.trim()) next.scope = 'Tell us a little about the project.';
      else if (form.scope.trim().length < 20) next.scope = 'A sentence or two more, please.';
    }
    if (target === 3) {
      if (!form.name.trim()) next.name = 'Your name is required.';
      if (!form.email.trim()) next.email = 'An email address is required.';
      else if (!EMAIL_RE.test(form.email.trim())) next.email = 'That email does not look right.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const goNext = useCallback(() => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (!validateStep(3)) return;
    // No backend in this build: the payload is logged so the integration point
    // is obvious. Wire this to your CRM or form endpoint.
    // eslint-disable-next-line no-console
    console.info('[One Gospel Media] enquiry submitted', form);
    setSubmitted(true);
  }, [form, validateStep]);

  const resetForm = useCallback(() => {
    setForm({
      services: [], date: '', budget: '', organisation: '',
      scope: '', name: '', email: '', phone: '',
    });
    setErrors({});
    setStep(1);
    setSubmitted(false);
  }, []);

  const progress = (step / STEPS.length) * 100;

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <AmbientOrb
        className="right-0 top-1/3 opacity-60"
        size={700}
        color="rgba(245,181,68,0.14)"
      />

      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left rail */}
          <div className="lg:col-span-5">
            <SectionHeading
              id="booking-heading"
              eyebrow="Start a project"
              title={
                <>
                  Tell us what you are
                  <br />
                  <span className="text-gradient-warm">trying to say.</span>
                </>
              }
              lede="Three short steps. We reply within two working days with a scoped approach, an honest budget range and the next available production window."
            />

            <figure className="relative mt-10 hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
              <SmartImage
                src={media.src}
                fallback={media.fallback}
                alt={media.alt}
                className="aspect-[4/3] w-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-obsidian-950 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-lg text-parchment-100">{BRAND.location}</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-1 inline-block font-mono text-[0.68rem] tracking-[0.14em] text-ember-glow transition-colors hover:text-parchment-100"
                >
                  {BRAND.email}
                </a>
              </figcaption>
            </figure>
          </div>

          {/* Form card */}
          <div className="lg:col-span-7">
            <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-ember-glow/40 bg-ember-glow/10">
                      <CheckCircle2 className="h-7 w-7 text-ember-glow" aria-hidden="true" />
                    </span>
                    <h3 className="mt-7 font-display text-3xl text-white">Enquiry received.</h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
                      Thank you, {form.name.split(' ')[0] || 'friend'}. Our producer will be in
                      touch at <span className="text-parchment-200">{form.email}</span> within two
                      working days with a scoped approach and next available dates.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ember-glow underline-offset-4 transition hover:underline"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-labelledby="booking-heading"
                  >
                    {/* Progress */}
                    <div className="mb-8">
                      <div className="mb-3 flex items-center justify-between">
                        <ol className="flex items-center gap-2" aria-label="Form progress">
                          {STEPS.map((s) => {
                            const done = step > s.id;
                            const current = step === s.id;
                            return (
                              <li key={s.id} className="flex items-center gap-2">
                                <span
                                  aria-current={current ? 'step' : undefined}
                                  className={`grid h-6 w-6 place-items-center rounded-full border text-[0.6rem] font-medium transition-colors duration-400 ${
                                    done
                                      ? 'border-ember-glow/50 bg-ember-glow/15 text-ember-glow'
                                      : current
                                        ? 'border-ember-glow bg-ember-glow text-obsidian-950'
                                        : 'border-white/15 text-ash'
                                  }`}
                                >
                                  {done ? <Check className="h-3 w-3" aria-hidden="true" /> : s.id}
                                </span>
                                <span
                                  className={`hidden font-mono text-[0.6rem] uppercase tracking-[0.16em] sm:inline ${
                                    current ? 'text-white' : 'text-ash'
                                  }`}
                                >
                                  {s.label}
                                </span>
                                {s.id !== STEPS.length && (
                                  <span aria-hidden="true" className="ml-1 h-px w-5 bg-white/12 sm:w-8" />
                                )}
                              </li>
                            );
                          })}
                        </ol>
                        <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ash">
                          {step} / {STEPS.length}
                        </span>
                      </div>
                      <div className="h-px w-full bg-white/10" role="presentation">
                        <motion.div
                          className="h-px bg-ember-glow"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {/* STEP 1 — scope */}
                      {step === 1 && (
                        <motion.div
                          key="s1"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="min-h-[22rem]"
                        >
                          <fieldset>
                            <legend className={labelClass}>
                              What do you need? Select all that apply
                            </legend>
                            <div className="flex flex-wrap gap-2">
                              {SERVICE_PILLS.map((pill) => {
                                const Icon = ICONS[pill.icon] || Video;
                                const on = form.services.includes(pill.id);
                                return (
                                  <button
                                    key={pill.id}
                                    type="button"
                                    onClick={() => toggleService(pill.id)}
                                    aria-pressed={on}
                                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.78rem] transition-all duration-400 ${
                                      on
                                        ? 'border-ember-glow/50 bg-ember-glow/12 text-ember-glow'
                                        : 'border-white/12 text-mist hover:border-white/28 hover:text-white'
                                    }`}
                                  >
                                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                    {pill.label}
                                    {on && <Check className="h-3 w-3" aria-hidden="true" />}
                                  </button>
                                );
                              })}
                            </div>
                            <FieldError id="services-error">{errors.services}</FieldError>
                          </fieldset>

                          <div className="mt-8 grid gap-5 sm:grid-cols-2">
                            <div>
                              <label htmlFor="booking-date" className={labelClass}>
                                Target date
                              </label>
                              <div className="relative">
                                <input
                                  id="booking-date"
                                  type="date"
                                  min={today}
                                  value={form.date}
                                  onChange={(e) => update('date', e.target.value)}
                                  className={`${fieldClass} date-field [color-scheme:dark]`}
                                />
                                <Calendar
                                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="booking-budget" className={labelClass}>
                                Budget range
                              </label>
                              <select
                                id="booking-budget"
                                value={form.budget}
                                onChange={(e) => update('budget', e.target.value)}
                                className={fieldClass}
                              >
                                <option value="">Select a range</option>
                                {BUDGET_RANGES.map((r) => (
                                  <option key={r} value={r}>{r}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2 — details */}
                      {step === 2 && (
                        <motion.div
                          key="s2"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="min-h-[22rem]"
                        >
                          <div>
                            <label htmlFor="booking-org" className={labelClass}>
                              Church, ministry or organisation
                            </label>
                            <input
                              id="booking-org"
                              type="text"
                              value={form.organisation}
                              onChange={(e) => update('organisation', e.target.value)}
                              placeholder="Grace Chapel"
                              className={fieldClass}
                            />
                          </div>

                          <div className="mt-6">
                            <label htmlFor="booking-scope" className={labelClass}>
                              Project scope
                            </label>
                            <textarea
                              id="booking-scope"
                              rows={7}
                              value={form.scope}
                              onChange={(e) => update('scope', e.target.value)}
                              placeholder="Tell us about the event, the audience, and what you want people to walk away with…"
                              aria-invalid={Boolean(errors.scope)}
                              aria-describedby={errors.scope ? 'scope-error' : undefined}
                              className={`${fieldClass} resize-none`}
                            />
                            <FieldError id="scope-error">{errors.scope}</FieldError>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3 — contact */}
                      {step === 3 && (
                        <motion.div
                          key="s3"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="min-h-[22rem]"
                        >
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label htmlFor="booking-name" className={labelClass}>
                                Full name <span aria-hidden="true" className="text-ember-glow">*</span>
                              </label>
                              <input
                                id="booking-name"
                                type="text"
                                required
                                autoComplete="name"
                                value={form.name}
                                onChange={(e) => update('name', e.target.value)}
                                placeholder="Jordan Okafor"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                className={fieldClass}
                              />
                              <FieldError id="name-error">{errors.name}</FieldError>
                            </div>

                            <div>
                              <label htmlFor="booking-phone" className={labelClass}>
                                Phone
                              </label>
                              <input
                                id="booking-phone"
                                type="tel"
                                autoComplete="tel"
                                value={form.phone}
                                onChange={(e) => update('phone', e.target.value)}
                                placeholder="+1 555 000 0000"
                                className={fieldClass}
                              />
                            </div>
                          </div>

                          <div className="mt-6">
                            <label htmlFor="booking-email" className={labelClass}>
                              Email <span aria-hidden="true" className="text-ember-glow">*</span>
                            </label>
                            <input
                              id="booking-email"
                              type="email"
                              required
                              autoComplete="email"
                              value={form.email}
                              onChange={(e) => update('email', e.target.value)}
                              placeholder="you@ministry.org"
                              aria-invalid={Boolean(errors.email)}
                              aria-describedby={errors.email ? 'email-error' : undefined}
                              className={fieldClass}
                            />
                            <FieldError id="email-error">{errors.email}</FieldError>
                          </div>

                          {/* Summary of what they picked earlier */}
                          <div className="mt-7 rounded-xl border border-white/10 bg-obsidian-950/40 p-5">
                            <h4 className="font-mono text-[0.58rem] uppercase tracking-ultra text-ash">
                              Your enquiry
                            </h4>
                            <dl className="mt-4 space-y-2 text-[0.78rem]">
                              <div className="flex justify-between gap-4">
                                <dt className="text-ash">Services</dt>
                                <dd className="text-right text-parchment-200">
                                  {form.services.length
                                    ? form.services
                                        .map((id) => SERVICE_PILLS.find((p) => p.id === id)?.label)
                                        .join(', ')
                                    : '—'}
                                </dd>
                              </div>
                              <div className="flex justify-between gap-4">
                                <dt className="text-ash">Target date</dt>
                                <dd className="text-parchment-200">{form.date || '—'}</dd>
                              </div>
                              <div className="flex justify-between gap-4">
                                <dt className="text-ash">Budget</dt>
                                <dd className="text-parchment-200">{form.budget || '—'}</dd>
                              </div>
                            </dl>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                      <button
                        type="button"
                        onClick={goBack}
                        disabled={step === 1}
                        className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist transition disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:text-white"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        Back
                      </button>

                      {step < STEPS.length ? (
                        <button
                          type="button"
                          onClick={goNext}
                          className="group inline-flex items-center gap-2 rounded-full bg-ember-glow px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-obsidian-950 transition-all duration-400 hover:bg-ember-warm hover:shadow-[0_8px_40px_-8px_rgba(245,181,68,0.6)]"
                        >
                          Continue
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="group inline-flex items-center gap-2 rounded-full bg-ember-glow px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-obsidian-950 transition-all duration-400 hover:bg-ember-warm hover:shadow-[0_8px_40px_-8px_rgba(245,181,68,0.6)]"
                        >
                          Send Enquiry
                          <Send
                            className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
