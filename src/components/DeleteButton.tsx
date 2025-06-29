'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

type Props = {
  onDelete: () => Promise<void>;
  label?: string;
};

type RelatedItem = {
  id: string;
  fileName: string;
};

export default function DeleteButton({ onDelete, label = 'item' }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [relatedContracts, setRelatedContracts] = useState<RelatedItem[]>([]);

  const handleClick = async () => {
    setErrorMessage('');
    setRelatedContracts([]);
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${label}?`);
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await onDelete();
      toast.success(`${capitalize(label)} deleted ✅`);
    } catch (error: any) {
      const message = error?.message || `Failed to delete ${label}`;
      setErrorMessage(message);

      if (error?.contracts && Array.isArray(error.contracts)) {
        setRelatedContracts(error.contracts);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={handleClick}
        disabled={isDeleting}
        className={`text-red-500 hover:text-red-700 transition ${
          isDeleting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      {errorMessage && (
        <div className="mt-1 text-xs text-red-600 whitespace-pre-line">
          {errorMessage}
        </div>
      )}

      {relatedContracts.length > 0 && (
        <ul className="mt-1 ml-1 text-xs text-red-600 list-disc list-inside space-y-1">
          {relatedContracts.map((c) => (
            <li key={c.id}>
              <a
                href={`/contracts?id=${c.id}`}
                className="underline hover:text-red-700"
              >
                {c.fileName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function capitalize(word = '') {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
