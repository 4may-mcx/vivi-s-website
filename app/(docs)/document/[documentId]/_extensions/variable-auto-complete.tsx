import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const VariableAutocomplete = Extension.create({
  name: 'variableAutocomplete',

  addOptions() {
    return {
      onTrigger: () => {}, // 触发回调函数
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('variableAutocomplete'),
        props: {
          handleTextInput: (
            view: EditorView,
            from: number,
            to: number,
            text: string,
          ) => {
            // 如果输入的字符为 `{`，检查前一个字符是否也是 `{`
            if (text === '{') {
              const prevChar = view.state.doc.textBetween(
                from - 1,
                from,
                '\0',
                '\0',
              );
              if (prevChar === '{') {
                // 触发菜单逻辑
                this.options.onTrigger(view, from - 1, to);
                return false; // 阻止默认行为
              }
            }
            return false;
          },
        },
      }),
    ];
  },
});
