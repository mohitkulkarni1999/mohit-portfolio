import { FiLayers } from 'react-icons/fi';
import CrudManager from './CrudManager';

const iconOptions = [
  { value: 'code', label: 'Code' }, { value: 'server', label: 'Server' }, { value: 'database', label: 'Database' },
  { value: 'cloud', label: 'Cloud' }, { value: 'palette', label: 'Design' }, { value: 'lightbulb', label: 'Idea' },
  { value: 'shield', label: 'Security' }, { value: 'zap', label: 'Lightning' }, { value: 'cpu', label: 'CPU' },
  { value: 'smartphone', label: 'Mobile' }, { value: 'globe', label: 'Globe' }, { value: 'tool', label: 'Tool' },
];

const columns = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'icon', label: 'Icon', type: 'select', options: iconOptions, default: 'code' },
  { key: 'features', label: 'Features (comma separated)', type: 'text', split: true, full: true, placeholder: 'React, Node, APIs' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function ServicesManager() {
  return (
    <CrudManager
      endpoint="/services"
      title="Service"
      columns={columns}
      icon={FiLayers}
      summary={(i) => i.title}
    />
  );
}
