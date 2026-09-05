import { FiAward } from 'react-icons/fi';
import CrudManager from './CrudManager';

const columns = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'issuer', label: 'Issuer', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'date_earned', label: 'Date Earned', type: 'date' },
  { key: 'credential_url', label: 'Credential URL', type: 'text' },
  { key: 'image_url', label: 'Image URL', type: 'text' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function CertificationsManager() {
  return (
    <CrudManager
      endpoint="/certificates"
      title="Certification"
      columns={columns}
      icon={FiAward}
      summary={(i) => i.title}
    />
  );
}
