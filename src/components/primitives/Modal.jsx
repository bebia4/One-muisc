import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { EASE } from '../../lib/motion';

/**
 * An accessible dialog: focus moves in on open and returns to the trigger on
 * close, Tab is trapped inside, Escape dismisses, and the backdrop is clickable.
 */
export default function Modal({ open, onClose, title, children, labelledBy = 'modal-title' }) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  useLockBodyScroll(open);

  // Remember what was focused before opening, restore it after closing.
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement;
      // Defer so the panel exists before we move focus into it.
      const id = window.setTimeout(() => panelRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
    previouslyFocused.current?.focus?.();
    return undefined;
  }, [open]);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-obsidian-950/88 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className="glass-strong relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl focus:outline-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
              <h2 id={labelledBy} className="font-mono text-xs uppercase tracking-ultra text-ember-glow">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-full border border-white/10 p-2 text-mist transition hover:border-ember-glow/50 hover:text-ember-glow"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
