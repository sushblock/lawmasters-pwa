import { Button } from '../../components/common';
export default function NavItem({ item, isActive, onClick }) {
  return <Button variant={isActive ? 'navActive' : 'nav'} onClick={onClick} className="space-x-2">
    <item.icon className="h-4 w-4" /><span className="text-sm">{item.label}</span>
  </Button>;
}
