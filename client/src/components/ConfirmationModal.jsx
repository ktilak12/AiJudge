import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Delete',
  isDanger = true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-card-bg border border-border-subtle p-6 shadow-2xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDanger ? 'bg-accent-red/10 text-accent-red border border-accent-red/20' : 'bg-accent-orange/10 text-accent-orange'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{title}</h3>
              <p className="text-xs text-secondary-text mt-0.5">{message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-secondary-text hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-secondary-text hover:text-white bg-secondary-bg hover:bg-card-hover border border-border-subtle transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white transition ${
              isDanger
                ? 'bg-accent-red hover:bg-red-600 shadow-glow-red'
                : 'bg-accent-orange hover:bg-orange-600'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

