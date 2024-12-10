import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Crown, Bell, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useApp();

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

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
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search"
            className="w-full pl-10 bg-zinc-800 border-zinc-700"
          />
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
