import { FiUsers } from 'react-icons/fi';
import CrudManager from './CrudManager';

const columns = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'message', label: 'Testimonial', type: 'textarea', full: true, required: true },
  { key: 'avatar_url', label: 'Avatar URL', type: 'text' },
  { key: 'rating', label: 'Rating (1-5)', type: 'number', default: 5 },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function TestimonialsManager() {
  return (
    <CrudManager
      endpoint="/testimonials"
      title="Testimonial"
      columns={columns}
      icon={FiUsers}
      summary={(i) => i.name}
    />
  );
}
