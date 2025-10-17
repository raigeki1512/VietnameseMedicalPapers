import type { Publication } from '../types';

// Map from CSV header names (case-sensitive) to our Publication keys.
const headerMapping: { [key: string]: keyof Publication } = {
  'PublishedDate': 'published_date',
  'Title': 'title',
  'Authors': 'authors',
  'Journal': 'journal',
  'Organization': 'organization',
  'PdfURL': 'pdf_url',
};

function parseCSV(csvText: string): Publication[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const rawHeaders = lines[0].split(',').map(h => h.trim());
  const publications: Publication[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cleanedLine = lines[i].trim();
    if (!cleanedLine) continue;

    const values = cleanedLine.split(',');
    if (values.length === rawHeaders.length) {
      const publication = rawHeaders.reduce((obj, rawHeader, index) => {
        const key = headerMapping[rawHeader];
        if (key) {
          (obj as any)[key] = values[index].trim();
        }
        return obj;
      }, {} as Publication);
      // Ensure all keys are present, even if empty, to match the type
      if (Object.keys(publication).length > 0) {
          publications.push(publication);
      }
    }
  }
  return publications;
}

export async function fetchPublications(url: string): Promise<Publication[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Failed to fetch or parse publication data:", error);
    throw error;
  }
}