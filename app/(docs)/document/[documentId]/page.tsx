import { Editor } from './editor';
import { Toolbar } from './toolbar';

interface DocumentPageProps {
  params: { documentId: string };
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = params;

  return (
    <div className="relative min-h-screen bg-[#F9FBFD]">
      <div className="fixed top-0 isolate z-50 w-full">
        <Toolbar />
      </div>
      <div className="w-full pt-16">
        <Editor documentId={documentId} />
      </div>
    </div>
  );
};

export default DocumentPage;
