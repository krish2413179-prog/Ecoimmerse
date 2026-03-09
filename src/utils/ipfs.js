// ============================================================
// src/utils/ipfs.js
// Pinata IPFS service — upload JSON, fetch JSON, with localStorage fallback
// ============================================================

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';
const PINATA_PIN_URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

// ── Upload JSON to Pinata ──────────────────────────────────────────────────
export async function uploadJSON(data, name = 'ecoimmerse-data') {
  if (!PINATA_JWT) {
    console.warn('[IPFS] No Pinata JWT found — using localStorage only');
    return null;
  }
  try {
    const body = {
      pinataContent: data,
      pinataMetadata: { name, keyvalues: { app: 'ecoimmerse' } },
      pinataOptions: { cidVersion: 1 },
    };
    const res = await fetch(PINATA_PIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Pinata error ${res.status}: ${err}`);
    }
    const json = await res.json();
    console.log(`[IPFS] Uploaded "${name}" → CID: ${json.IpfsHash}`);
    return json.IpfsHash; // CIDv1 string
  } catch (err) {
    console.error('[IPFS] Upload failed:', err.message);
    return null;
  }
}

// ── Fetch JSON from IPFS gateway ──────────────────────────────────────────
export async function fetchJSON(cid) {
  if (!cid) return null;
  try {
    const url = `${IPFS_GATEWAY}${cid}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Gateway error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[IPFS] Fetch failed for CID', cid, ':', err.message);
    return null;
  }
}

// ── CID registry in localStorage ──────────────────────────────────────────
export function getUserCID(userId) {
  return localStorage.getItem(`ecoimmerse:cid:${userId}`) || null;
}

export function saveUserCID(userId, cid) {
  if (cid) localStorage.setItem(`ecoimmerse:cid:${userId}`, cid);
}

export function getCommunityCID() {
  return localStorage.getItem('ecoimmerse:community:cid') || null;
}

export function saveCommunityCID(cid) {
  if (cid) localStorage.setItem('ecoimmerse:community:cid', cid);
}

// ── Health check ──────────────────────────────────────────────────────────
export async function checkPinataAuth() {
  if (!PINATA_JWT) return false;
  try {
    const res = await fetch('https://api.pinata.cloud/data/testAuthentication', {
      headers: { Authorization: `Bearer ${PINATA_JWT}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}
