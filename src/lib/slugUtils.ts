// Utility function untuk generate slug dari title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Utility function untuk find news by slug
export function findNewsBySlug(news: any[], slug: string) {
  return news.find(item => generateSlug(item.title) === slug);
}
