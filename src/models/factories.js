import { MATTER_STATUSES } from './types';

// keep this
export const uid = (p='id') => `${p}_${Math.random().toString(36).slice(2,9)}_${Date.now()}`;

// NEW: helper that preserves your capitalized labels
function normalizePriority(p) {
  const CAPS = ['Low', 'Medium', 'High', 'Urgent'];
  if (CAPS.includes(p)) return p; // already in the style your UI expects
  const map = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' };
  const lc = (p ?? '').toString().toLowerCase();
  return map[lc] ?? 'Medium';
}

export function createEmptyMatter() {
  return {
    id: uid('matter'),
    caseNo: '',
    title: '',
    court: '',
    status: 'Active',
    priority: 'Medium', // capitalized to match your UI
    client: '',
    opponent: '',
    stage: '',
    judge: '',
    filingDate: new Date().toISOString().slice(0,10),
    description: ''
  };
}

export function normalizeMatter(m) {
  return {
    ...m,
    status: MATTER_STATUSES.includes(m.status) ? m.status : 'Active',
    priority: normalizePriority(m.priority),
  };
}
