import { FiTrendingUp } from 'react-icons/fi';
import CrudManager from './CrudManager';

const iconOptions = [
  { value: 'briefcase', label: 'Briefcase' }, { value: 'folder', label: 'Folder' }, { value: 'users', label: 'Users' },
  { value: 'git', label: 'Git' }, { value: 'star', label: 'Star' }, { value: 'award', label: 'Award' },
  { value: 'zap', label: 'Zap' }, { value: 'globe', label: 'Globe' }, { value: 'code', label: 'Code' },
  { value: 'heart', label: 'Heart' }, { value: 'cloud', label: 'Cloud' }, { value: 'check', label: 'Check' },
];

const columns = [
  { key: 'label', label: 'Label', type: 'text', required: true, placeholder: 'e.g. Years Experience' },
  { key: 'value', label: 'Value', type: 'text', required: true, placeholder: 'e.g. 5' },
  { key: 'suffix', label: 'Suffix', type: 'text', default: '+', placeholder: '+', },
  { key: 'icon', label: 'Icon', type: 'select', options: iconOptions, default: 'star' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function StatsManager() {
  return (
    <CrudManager endpoint="/stats" title="Stat" columns={columns} icon={FiTrendingUp} summary={(i) => `${i.value}${i.suffix} ${i.label}`} />
  );
}
