import { memo, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const toggleAction = (action) => (e) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-700/50 bg-surface-bright/30 rounded-t-2xl">
      <div className="flex items-center gap-1 pr-2 border-r border-slate-700/50">
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleBold().run())}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-2 py-1.5 rounded transition-colors text-sm font-bold ${
            editor.isActive('bold') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Bold"
        >
          B
        </button>
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleItalic().run())}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-2 py-1.5 rounded transition-colors text-sm italic font-serif ${
            editor.isActive('italic') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Italic"
        >
          I
        </button>
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleStrike().run())}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-2 py-1.5 rounded transition-colors text-sm line-through ${
            editor.isActive('strike') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Strikethrough"
        >
          S
        </button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-slate-700/50">
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
          className={`px-2 py-1.5 rounded transition-colors text-sm font-bold ${
            editor.isActive('heading', { level: 2 }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Heading"
        >
          H
        </button>
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleBulletList().run())}
          className={`px-2 py-1.5 rounded transition-colors text-sm ${
            editor.isActive('bulletList') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleOrderedList().run())}
          className={`px-2 py-1.5 rounded transition-colors text-sm ${
            editor.isActive('orderedList') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Ordered List"
        >
          1. List
        </button>
      </div>

      <div className="flex items-center gap-1 pl-2">
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleBlockquote().run())}
          className={`px-2 py-1.5 rounded transition-colors text-sm ${
            editor.isActive('blockquote') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Blockquote"
        >
          &quot;
        </button>
        <button
          onClick={toggleAction(() => editor.chain().focus().toggleCodeBlock().run())}
          className={`px-2 py-1.5 rounded transition-colors text-sm font-mono ${
            editor.isActive('codeBlock') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-surface-bright'
          }`}
          title="Code Block"
        >
          &lt;/&gt;
        </button>
      </div>
    </div>
  );
};

export const RichTextEditor = memo(function RichTextEditor({ value, onChange, onBlur, placeholder = 'Add a more detailed description...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-400 underline hover:text-indigo-300 transition-colors cursor-pointer',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'min-h-[120px] p-4 text-sm text-slate-300 focus:outline-none custom-scrollbar leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      // Call onChange with the HTML content whenever it changes
      onChange?.(editor.getHTML());
    },
    onBlur: ({ editor }) => {
      // Trigger the save action when the editor loses focus
      onBlur?.(editor.getHTML());
    },
  });

  // Keep editor content in sync if 'value' prop changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      // Only update if the new value is different to avoid cursor jumps
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col w-full bg-surface-bright/20 border border-slate-700/50 rounded-2xl focus-within:border-indigo-500 focus-within:bg-surface-bright/30 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap-wrapper flex-grow" />
    </div>
  );
});
