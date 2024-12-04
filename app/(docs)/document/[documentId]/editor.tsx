'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
    editorProps: {
      attributes: {
        class: '',
      },
    },
  });
  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:overflow-visible print:bg-white print:p-0">
      <EditorContent
        className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-full print:py-0"
        editor={editor}
      />
    </div>
  );
};
