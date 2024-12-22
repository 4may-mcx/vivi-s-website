'use client';

import { useEditorStore } from '@/src/store/use-editor-store';
import Color from '@tiptap/extension-color';
import Dropcursor from '@tiptap/extension-dropcursor';
import FontFamily from '@tiptap/extension-font-family';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import Mustache from 'mustache';
import { GetDocumentById } from '@/actions/mock/getDocumentById';
import { Document_Variables } from '../constant';

const parseContentWithMustache = (
  content: string,
  variables: Record<string, string>,
) => {
  // 使用 Mustache 渲染传入的变量
  return Mustache.render(content, variables);
};

export const PreviewContent = ({ documentId }: { documentId: string }) => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    editable: false,
    onCreate: ({ editor }) => {
      setEditor(editor);
      GetDocumentById(documentId).then((content) => {
        editor.commands.setContent(
          parseContentWithMustache(content ?? '', Document_Variables),
        );
      });
    },
    extensions: [
      Highlight.configure({ multicolor: true }),
      TaskItem.configure({ nested: true }),
      StarterKit,
      FontFamily,
      TextStyle,
      Color,
      Heading,
      Image,
      ImageResize,
      Dropcursor,
      Underline,
      TaskList,
    ],
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px;',
        class:
          'focus:outline-none print:border-0 bg-white border-[0.5px] border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:overflow-visible print:bg-white print:p-0">
      <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-full print:py-0">
        <EditorContent editor={editor} disabled />
      </div>
    </div>
  );
};
