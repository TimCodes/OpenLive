import { useState } from 'react';
import { CategoryGrid } from '@/components/categories/CategoryGrid';
import { mockCategories } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Users } from 'lucide-react';

export function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'viewers' | 'name'>('viewers');

  const filteredAndSortedCategories = mockCategories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'viewers') {
        return b.viewers - a.viewers;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-2xl mx-auto">
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Browse Categories</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search Categories"
                className="pl-10 bg-zinc-800 border-zinc-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'viewers' ? 'default' : 'outline'}
                onClick={() => setSortBy('viewers')}
                className="flex-1 sm:flex-none"
              >
                <Users className="w-4 h-4 mr-2" />
                Viewers
              </Button>
              <Button
                variant={sortBy === 'name' ? 'default' : 'outline'}
                onClick={() => setSortBy('name')}
                className="flex-1 sm:flex-none"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Name
              </Button>
            </div>
          </div>
        </div>

        <CategoryGrid categories={filteredAndSortedCategories} />
      </div>
    </div>
  );
}
