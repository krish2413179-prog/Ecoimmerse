// ============================================================
// src/utils/userStore.js
// High-level load/save for user profile data via IPFS + localStorage fallback
// ============================================================

import { uploadJSON, fetchJSON, getUserCID, saveUserCID } from './ipfs';
import { v4 as uuidv4 } from './uuid';

// ── Default blank profile ─────────────────────────────────────────────────
export const DEFAULT_PROFILE = {
  version: 1,
  userId: null,
  updatedAt: null,
  profile: {
    impactScore: 2847,
    ecoPoints: 2450,
    weeklyData: {
      carbonReduction: 45.2,
      wasteReduction: 12.8,
      energySavings: 89.5,
    },
  },
  achievements: [
    { id: 1, title: 'First Steps', description: 'Completed your first week', icon: 'Footprints', category: 'carbon', earned: true, earnedDate: '2025-01-10' },
    { id: 2, title: 'Carbon Warrior', description: 'Reduced 100kg CO₂ this month', icon: 'Shield', category: 'carbon', earned: true, earnedDate: '2025-01-08' },
    { id: 3, title: 'Waste Reducer', description: 'Diverted 50kg from landfill', icon: 'Recycle', category: 'waste', earned: true, earnedDate: '2025-01-05' },
    { id: 4, title: 'Energy Saver', description: 'Saved 200kWh this month', icon: 'Zap', category: 'energy', earned: false, earnedDate: null },
    { id: 5, title: 'Community Leader', description: 'Inspired 10 friends to join', icon: 'Users', category: 'social', earned: false, earnedDate: null },
    { id: 6, title: 'Consistency Champion', description: '30 days of daily actions', icon: 'Calendar', category: 'habit', earned: false, earnedDate: null },
  ],
  goals: [
    { id: 1, title: 'Reduce Monthly Carbon Footprint', target: 200, current: 145.2, category: 'carbon', deadline: '2025-03-31', createdDate: '2025-01-01' },
    { id: 2, title: 'Zero Waste Week Challenge', target: 7, current: 4, category: 'waste', deadline: '2025-03-20', createdDate: '2025-01-13' },
    { id: 3, title: 'Energy Efficiency Goal', target: 300, current: 189.5, category: 'energy', deadline: '2025-04-15', createdDate: '2025-01-01' },
  ],
  journalEntries: [
    {
      id: 1,
      date: '2025-01-12T10:30:00Z',
      duration: 45,
      transcription: 'Today I made a conscious effort to reduce my carbon footprint by cycling to work instead of driving.',
      waveform: [],
      audioUrl: '#',
    },
  ],
  redemptions: [],
};

// ── Resolve / create userId ───────────────────────────────────────────────
export function resolveUserId() {
  let uid = localStorage.getItem('ecoimmerse:userId');
  if (!uid) {
    uid = uuidv4();
    localStorage.setItem('ecoimmerse:userId', uid);
  }
  return uid;
}

const LS_KEY = (uid) => `ecoimmerse:profile:${uid}`;

// ── Load profile: IPFS first, localStorage fallback ───────────────────────
export async function loadUserProfile(userId) {
  // 1. Try loading latest CID from localStorage → fetch from IPFS
  const cid = getUserCID(userId);
  if (cid) {
    const data = await fetchJSON(cid);
    if (data) {
      // Cache locally too
      localStorage.setItem(LS_KEY(userId), JSON.stringify(data));
      return data;
    }
  }

  // 2. Fallback: read from localStorage cache
  const cached = localStorage.getItem(LS_KEY(userId));
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // corrupted — fall through
    }
  }

  // 3. Brand-new user — seed default profile
  const fresh = { ...DEFAULT_PROFILE, userId, updatedAt: new Date().toISOString() };
  localStorage.setItem(LS_KEY(userId), JSON.stringify(fresh));
  return fresh;
}

// ── Save profile: localStorage first, then IPFS async ────────────────────
// Returns { saved: true, cid: string|null }
export async function saveUserProfile(userId, profile) {
  const updated = { ...profile, userId, updatedAt: new Date().toISOString() };

  // Always persist locally first (so UI never stalls)
  localStorage.setItem(LS_KEY(userId), JSON.stringify(updated));

  // Upload to Pinata async
  const cid = await uploadJSON(updated, `ecoimmerse-user-${userId}`);
  if (cid) saveUserCID(userId, cid);

  return { saved: true, cid };
}
