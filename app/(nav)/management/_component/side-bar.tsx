'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
  SquareDashedMousePointer,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routeConfig = [
  {
    href: '',
    label: '首页',
    icon: HomeIcon,
  },
  {
    href: 'workflows',
    label: 'Workflows',
    icon: Layers2Icon,
  },
  {
    href: 'credentials',
    label: 'Credentials',
    icon: ShieldCheckIcon,
  },
];

const LogoCell = () => {
  return (
    <Link
      href="/management"
      className={cn('flex items-center gap-2 text-2xl font-extrabold')}
    >
      <div className="rounded-xl bg-gradient-to-r from-gray-500 to-black p-2">
        <SquareDashedMousePointer size={14} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-gray-500 to-stone-700 bg-clip-text text-lg text-transparent">
          资源管理
        </span>
      </div>
    </Link>
  );
};

export const ManagementSideBar = () => {
  const pathname = usePathname();
  const activeRoute =
    routeConfig.find(
      (route) => route.href.length > 0 && pathname.includes(route.href),
    ) ?? routeConfig[0];

  return (
    <div className="relative hidden w-[220px] overflow-hidden border-r-[1px] text-muted-foreground md:block">
      <div className="flex items-center justify-center gap-2 p-3">
        <LogoCell />
      </div>
      <div className="flex flex-col gap-2 p-2">
        {routeConfig.map((route) => (
          <Link
            href={`/management/${route.href}`}
            key={route.href}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: cn(
                '!justify-start gap-2 hover:bg-gray-600 hover:text-primary-foreground',
                activeRoute.href === route.href &&
                  'bg-gray-600 text-primary-foreground',
              ),
            })}
          >
            <route.icon size={20} />
            <span>{route.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
