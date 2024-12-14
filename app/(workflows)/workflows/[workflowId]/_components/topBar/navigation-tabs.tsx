import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
  const pathname = usePathname();
  const routes = pathname.split('/');

  if (routes.length > 4) return null;
  const isRunTablePage = routes.includes('runs');

  const activeValue = isRunTablePage ? 'runs' : 'editor';

  return (
    <Tabs value={activeValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflows/${workflowId}`}>
          <TabsTrigger value="editor" className="w-full">
            Editor
          </TabsTrigger>
        </Link>
        <Link href={`/workflows/${workflowId}/runs`}>
          <TabsTrigger value="runs" className="w-full">
            Runs
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};
