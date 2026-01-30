'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = 'Tulis konten berita...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const addImage = () => {
    const url = window.prompt('URL Gambar:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('URL:');
    if (url) {
      editor.chain().focus().toggleLink({ href: url }).run();
    }
  };

  const toggleButtonClass = (isActive: boolean) =>
    `p-2 rounded transition ${
      isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toggleButtonClass(editor.isActive('bold'))}
          title="Bold (Ctrl+B)"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toggleButtonClass(editor.isActive('italic'))}
          title="Italic (Ctrl+I)"
        >
          <Italic size={18} />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={toggleButtonClass(editor.isActive('heading', { level: 1 }))}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={toggleButtonClass(editor.isActive('heading', { level: 2 }))}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toggleButtonClass(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toggleButtonClass(editor.isActive('orderedList'))}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button
          onClick={setLink}
          className={toggleButtonClass(editor.isActive('link'))}
          title="Add Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          title="Add Image"
        >
          <ImageIcon size={18} />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded transition ${
            editor.can().undo()
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-300'
          }`}
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded transition ${
            editor.can().redo()
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-300'
          }`}
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>

      {/* Editor */}
      <div className="prose prose-sm max-w-none p-4 bg-white text-slate-900">
        <EditorContent
          editor={editor}
          className="prose max-w-none focus:outline-none text-slate-900"
          style={{ color: '#1e293b' }}
        />
      </div>
    </div>
  );
}
