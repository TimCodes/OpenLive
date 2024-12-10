import { Link } from 'wouter';
import { Category } from '@/lib/mock-data';
import { Gamepad2, Users } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <a className="group bg-zinc-800/50 rounded-lg overflow-hidden hover:bg-zinc-800 transition-colors">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={category.thumbnailUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                <Users className="w-4 h-4" />
                {category.viewers.toLocaleString()}
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium line-clamp-1 flex-1">{category.name}</h3>
                <Gamepad2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-zinc-700/50 px-2 py-1 rounded">Gaming</span>
                <span className="text-xs bg-zinc-700/50 px-2 py-1 rounded">
                  {category.viewers > 100000 ? 'Popular' : 'Growing'}
                </span>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
