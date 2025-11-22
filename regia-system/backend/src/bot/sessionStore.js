const sessions = new Map();

export function getSession(phone) {
  if (!sessions.has(phone)) {
    sessions.set(phone, {
      stage: "onboarding",
      profile: {},
      human: { active: false, notes: "" },
      lastIntent: null,
    });
  }
  return sessions.get(phone);
}

export function updateSession(phone, patch) {
  const s = getSession(phone);
  const up = { ...s, ...patch };
  sessions.set(phone, up);
  return up;
}
