// Armazena estado leve em memória (pode trocar por Redis/DB)
const sessions = new Map();

/**
 * Estrutura:
 * {
 *   phone: {
 *     name,
 *     stage: 'onboarding'|'menu'|'faq'|'handoff'|'collecting'|'ai',
 *     profile: { nome, email },
 *     lastIntent,
 *     human: { active: boolean, notes: string }
 *   }
 * }
 */
export function getSession(phone) {
  if (!sessions.has(phone)) {
    sessions.set(phone, {
      stage: 'onboarding',
      profile: {},
      human: { active: false, notes: '' }
    });
  }
  return sessions.get(phone);
}

export function updateSession(phone, patch) {
  const s = getSession(phone);
  const next = { ...s, ...patch, profile: { ...s.profile, ...(patch.profile || {}) } };
  sessions.set(phone, next);
  return next;
}

export function resetSession(phone) {
  sessions.delete(phone);
}
