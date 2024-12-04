import { Editor } from './editor';
import { Toolbar } from './toolbar';

interface DocumentPageProps {
  params: { documentId: string };
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = params;
  console.log(documentId);
  return (
    <div className="z-0 min-h-screen bg-[#F9FBFD]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentPage;
