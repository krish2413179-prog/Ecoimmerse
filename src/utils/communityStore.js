// ============================================================
// src/utils/communityStore.js
// IPFS storage for global community forest stats
// ============================================================

import { uploadJSON, fetchJSON, getCommunityCID, saveCommunityCID } from './ipfs';

const DEFAULT_COMMUNITY = {
  version: 1,
  totalTrees: 89500,
  activeUsers: 14500,
  co2Offset: 450000,
  recentPlanters: [],
  updatedAt: new Date().toISOString()
};

const LS_KEY = 'ecoimmerse:communityData';

// ── Load Community Data ───────────────────────────────────────────────────
export async function loadCommunityData() {
  const cid = getCommunityCID();
  if (cid) {
    const data = await fetchJSON(cid);
    if (data) {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
      return data;
    }
  }

  const cached = localStorage.getItem(LS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch { } // ignore
  }

  return DEFAULT_COMMUNITY;
}

// ── Update Community Data ─────────────────────────────────────────────────
export async function updateCommunityData(patchFn) {
  const current = await loadCommunityData();
  const next = { ...patchFn(current), updatedAt: new Date().toISOString() };
  
  localStorage.setItem(LS_KEY, JSON.stringify(next));

  const cid = await uploadJSON(next, 'ecoimmerse-community-stats');
  if (cid) {
    saveCommunityCID(cid);
  }
  
  return next;
}
