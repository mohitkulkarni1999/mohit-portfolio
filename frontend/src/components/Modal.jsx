import { FiX } from 'react-icons/fi';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className={`relative bg-surface-900 border border-surface-700 rounded-xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto animate-fade-in`}>
        <div className="sticky top-0 bg-surface-900 border-b border-surface-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-ink-soft hover:text-ink transition-colors"><FiX size={22} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
