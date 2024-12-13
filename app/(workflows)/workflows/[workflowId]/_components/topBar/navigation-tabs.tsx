'use client';

import { Tabs, TabsList } from '@/components/ui/tabs';
import Link from 'next/link';

export const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Tabs className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflows/${workflowId}`}>Editor</Link>
        <Link href={`/workflows/${workflowId}/runs`}>Runs</Link>
      </TabsList>
    </Tabs>
  );
};
