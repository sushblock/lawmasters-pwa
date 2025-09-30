export default function Button({ variant='primary', size='md', className='', children, ...props }) {
  const base = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    success: 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg',
    nav: 'text-white hover:bg-white/20 hover:text-yellow-300 border border-white/20',
    navActive: 'bg-white text-blue-900 shadow-lg',
  };
  const sizes = { sm:'px-2 py-1 text-xs', md:'px-4 py-2 text-sm', lg:'px-6 py-3 text-base' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}
