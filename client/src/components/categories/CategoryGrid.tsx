import { Link } from 'wouter';
import { Category } from '@/lib/mock-data';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <a className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src={category.thumbnailUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-zinc-400">
                {category.viewers.toLocaleString()} viewers
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
