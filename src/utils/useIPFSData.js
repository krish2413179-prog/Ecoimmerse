// ============================================================
// src/utils/useIPFSData.js
// Custom React Hook to sync user profile with IPFS
// ============================================================

import { useState, useEffect } from 'react';
import { resolveUserId, loadUserProfile, saveUserProfile } from './userStore';
import { checkPinataAuth } from './ipfs';

export function useIPFSData() {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('offline'); // 'offline', 'syncing', 'synced'

  useEffect(() => {
    async function init() {
      const isOnline = navigator.onLine && (await checkPinataAuth());
      if (!isOnline) {
        setSyncStatus('offline');
      }

      const uid = resolveUserId();
      setUserId(uid);

      try {
        const data = await loadUserProfile(uid);
        setProfile(data);
        if (isOnline) setSyncStatus('synced');
      } catch (err) {
        console.error('Failed to load profile:', err);
        setSyncStatus('offline');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Expose an updater function
  const updateProfile = async (patchFn) => {
    if (!profile || !userId) return;

    // Optimistic UI update
    const newProfile = typeof patchFn === 'function' ? patchFn(profile) : { ...profile, ...patchFn };
    setProfile(newProfile);

    // Background sync
    if (navigator.onLine) {
      setSyncStatus('syncing');
      try {
        await saveUserProfile(userId, newProfile);
        setSyncStatus('synced');
      } catch {
        setSyncStatus('offline');
      }
    }
  };

  return { userId, profile, loading, syncStatus, updateProfile };
}
