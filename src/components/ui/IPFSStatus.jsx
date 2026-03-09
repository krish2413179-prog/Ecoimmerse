import React from 'react';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { getUserCID } from '../../utils/ipfs';

export default function IPFSStatus({ syncStatus, userId }) {
  const cid = userId ? getUserCID(userId) : null;
  const ipfsLink = cid ? `https://gateway.pinata.cloud/ipfs/${cid}` : '#';

  const styles = {
    synced: 'bg-green-100 text-green-700 border-green-200',
    syncing: 'bg-blue-100 text-blue-700 border-blue-200',
    offline: 'bg-red-100 text-red-700 border-red-200',
  };

  const labels = {
    synced: 'Synced to IPFS',
    syncing: 'Saving to IPFS...',
    offline: 'Local Cache (Offline)',
  };

  return (
    <div className={`fixed bottom-6 left-6 z-50 flex items-center px-4 py-2 space-x-2 text-sm font-medium border rounded-full shadow-lg transition-colors ${styles[syncStatus] || styles.offline}`}>
      {syncStatus === 'synced' && <Cloud className="w-4 h-4" />}
      {syncStatus === 'syncing' && <RefreshCw className="w-4 h-4 animate-spin" />}
      {syncStatus === 'offline' && <CloudOff className="w-4 h-4" />}
      
      {syncStatus === 'synced' && cid ? (
        <a href={ipfsLink} target="_blank" rel="noreferrer" className="hover:underline" title="View strictly raw JSON stored on IPFS">
          {labels[syncStatus]}
        </a>
      ) : (
        <span>{labels[syncStatus] || labels.offline}</span>
      )}
    </div>
  );
}
