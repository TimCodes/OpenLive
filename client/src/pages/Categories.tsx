import { CategoryGrid } from '@/components/categories/CategoryGrid';
import { mockCategories } from '@/lib/mock-data';

export function Categories() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-bold p-4">Browse</h1>
        <CategoryGrid categories={mockCategories} />
      </div>
    </div>
  );
}
