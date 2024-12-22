import { PreviewContent } from './preview-content';

export default function DocumentPreviewPage({
  params: { documentId },
}: {
  params: { documentId: string };
}) {
  return (
    <div className="relative min-h-screen bg-[#F9FBFD]">
      <div className="w-full pt-16">
        <PreviewContent documentId={documentId} />
      </div>
    </div>
  );
}
