import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Crown, Bell, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Stream, mockStreams } from '@/lib/mock-data';

export function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useApp();
  const [searchResults, setSearchResults] = useState<Stream[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase().trim();
    setIsSearching(term.length > 0);
    
    if (term.length === 0) {
      setSearchResults([]);
      return;
    }

    const filtered = mockStreams.filter(stream => 
      stream.title.toLowerCase().includes(term) ||
      stream.streamer.toLowerCase().includes(term) ||
      stream.game.toLowerCase().includes(term)
    );
    setSearchResults(filtered);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center h-14 px-4 border-b border-zinc-800 bg-zinc-900">
      <div className="flex items-center gap-8">
        <Link href="/">
          <a className="text-2xl font-bold text-purple-500">Twitch</a>
        </Link>
        <Link href="/">
          <a className="hover:text-purple-400">Following</a>
        </Link>
        <Link href="/categories">
          <a className="hover:text-purple-400">Browse</a>
        </Link>
      </div>

      <div className="flex-1 max-w-xl mx-8">
        <div className="relative" ref={searchRef}>
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search"
            className="w-full pl-10 bg-zinc-800 border-zinc-700"
            onChange={(e) => {
              handleSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
          />
          {showResults && isSearching && (
            <div 
              className="absolute w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg overflow-hidden z-[100]"
            >
              {searchResults.length > 0 ? (
                searchResults.map(stream => (
                  <Link key={stream.id} href={`/stream/${stream.id}`}>
                    <a 
                      className="flex items-center gap-2 p-2 hover:bg-zinc-800 transition-colors"
                      onClick={() => setShowResults(false)}
                    >
                      <img 
                        src={stream.avatarUrl} 
                        alt={stream.streamer} 
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{stream.title}</p>
                        <p className="text-sm text-zinc-400">{stream.streamer} · {stream.game}</p>
                      </div>
                    </a>
                  </Link>
                ))
              ) : (
                <div className="p-2 text-zinc-400">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Crown className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant={isLoggedIn ? "destructive" : "default"}
          onClick={handleLoginClick}
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </Button>
      </div>
    </nav>
  );
}
