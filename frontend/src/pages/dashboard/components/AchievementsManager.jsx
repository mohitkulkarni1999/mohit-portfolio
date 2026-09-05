import { FiAward } from 'react-icons/fi';
import CrudManager from './CrudManager';

const iconOptions = [
  { value: 'award', label: 'Award' }, { value: 'trophy', label: 'Trophy' }, { value: 'code', label: 'Code' },
  { value: 'star', label: 'Star' }, { value: 'thumbs', label: 'Thumbs Up' }, { value: 'zap', label: 'Zap' },
  { value: 'shield', label: 'Shield' }, { value: 'lightbulb', label: 'Idea' },
];

const columns = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'date_awarded', label: 'Date', type: 'date' },
  { key: 'issuer', label: 'Issuer', type: 'text' },
  { key: 'icon', label: 'Icon', type: 'select', options: iconOptions, default: 'award' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function AchievementsManager() {
  return (
    <CrudManager endpoint="/achievements" title="Achievement" columns={columns} icon={FiAward} summary={(i) => i.title} />
  );
}
