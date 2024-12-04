import { Editor } from './editor';

interface DocumentPageProps {
  params: { documentId: string };
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = params;
  console.log(documentId);
  return (
    <div className="z-0 min-h-screen bg-[#F9FBFD]">
      <Editor />
    </div>
  );
};

export default DocumentPage;
