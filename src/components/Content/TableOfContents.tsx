import React, { useEffect, useState } from 'react';
import { Document } from '@contentful/rich-text-types';
import { BLOCKS } from '@contentful/rich-text-types';

interface TableOfContentsProps {
  content: Document;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const extractHeaders = (doc: Document) => {
      const items: TocItem[] = [];
      
      const processNode = (node: any) => {
        if (node.nodeType === BLOCKS.HEADING_1 || node.nodeType === BLOCKS.HEADING_2) {
          const text = node.content
            .map((content: any) => content.value)
            .join('')
            .trim();
          
          if (text) {
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            items.push({
              id,
              text,
              level: node.nodeType === BLOCKS.HEADING_1 ? 1 : 2
            });
          }
        }
        
        if (node.content) {
          node.content.forEach(processNode);
        }
      };

      doc.content.forEach(processNode);
      return items;
    };

    const items = extractHeaders(content);
    setTocItems(items);
  }, [content]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-bold text-xl mb-4">Explore This Page</h3>
      <nav className="space-y-2">
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block leading-tight text-bb-blue hover:underline ${
              item.level === 2 ? 'pl-4 text-sm' : 'font-medium'
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents; 