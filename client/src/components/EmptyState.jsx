import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, PlusCircle } from 'lucide-react';

export const EmptyState = ({
  title = 'No Records Found',
  description = 'You have not submitted any activities to the Court yet.',
  actionText = 'Judge My Day',
  actionLink = '/judge'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 rounded-2xl bg-card-bg border border-border-subtle text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-secondary-bg border border-border-subtle flex items-center justify-center shadow-inner">
        <Gavel className="w-8 h-8 text-secondary-text" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h4 className="text-base font-bold text-primary-text">{title}</h4>
        <p className="text-xs text-secondary-text leading-relaxed">{description}</p>
      </div>
      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{actionText}</span>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

