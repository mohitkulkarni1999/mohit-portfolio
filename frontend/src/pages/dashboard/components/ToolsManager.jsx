import { FiTool } from 'react-icons/fi';
import CrudManager from './CrudManager';

const categoryOptions = [
  { value: 'Technology', label: 'Technology' }, { value: 'Developer', label: 'Developer' },
  { value: 'Design', label: 'Design' }, { value: 'DevOps', label: 'DevOps' },
  { value: 'API', label: 'API' }, { value: 'Tools', label: 'Tools' }, { value: 'OS', label: 'OS' },
];

const columns = [
  { key: 'name', label: 'Tool Name', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'select', options: categoryOptions, default: 'Technology' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'icon_url', label: 'Icon URL', type: 'text' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default function ToolsManager() {
  return (
    <CrudManager endpoint="/tools" title="Tool" columns={columns} icon={FiTool} summary={(i) => i.name} />
  );
}
