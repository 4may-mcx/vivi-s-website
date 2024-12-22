'use client';

import { GetDocumentById } from '@/actions/mock/getDocumentById';
import { UpdateDocumentById } from '@/actions/mock/updateDocumentById';
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
import { useState } from 'react';
import { VariableAutocomplete } from './_extensions/variable-auto-complete';
import { Document_Variables } from './constant';

export const Editor = ({ documentId }: { documentId: string }) => {
  const { setEditor } = useEditorStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleTrigger = (view: any, from: any, to: any) => {
    const coords = view.coordsAtPos(to);
    setMenuPosition({ top: coords.top - 20, left: coords.left }); // 菜单位置
    setMenuVisible(true);
  };

  const handleInsertVariable = (variable: string) => {
    editor?.commands.insertContent(`${variable}}}`);
    setMenuVisible(false);
  };

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
      GetDocumentById(documentId).then((content) => {
        editor.commands.setContent(content ?? '');
      });
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
      UpdateDocumentById(documentId, editor.getHTML());
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
      VariableAutocomplete.configure({
        onTrigger: handleTrigger,
      }),
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
    <div className="relative size-full overflow-x-auto bg-[#F9FBFD] px-4 print:overflow-visible print:bg-white print:p-0">
      <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-full print:py-0">
        <EditorContent editor={editor} />
      </div>

      {/* 变量菜单 */}
      {menuVisible && (
        <div
          style={{
            position: 'absolute',
            top: menuPosition.top,
            left: menuPosition.left,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          className="z-10"
        >
          {Object.keys(Document_Variables).map((key) => (
            <div
              key={key}
              onClick={() => handleInsertVariable(key)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {key}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
