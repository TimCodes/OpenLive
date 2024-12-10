import { useState } from 'react';
import { Link } from 'wouter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { mockStreams } from '@/lib/mock-data';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-zinc-900 h-full flex flex-col ${collapsed ? 'w-16' : 'w-60'}`}>
      <Button
        variant="ghost"
        size="icon"
        className="self-end m-2"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>

      <div className="p-4">
        {!collapsed && <h2 className="text-sm font-semibold mb-4">FOLLOWED CHANNELS</h2>}
        <ScrollArea className="h-[400px]">
          {mockStreams.slice(0, 10).map((stream) => (
            <Link key={stream.id} href={`/stream/${stream.id}`}>
              <a className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded">
                <img
                  src={stream.avatarUrl}
                  alt={stream.streamer}
                  className="w-8 h-8 rounded-full"
                />
                {!collapsed && (
                  <div>
                    <p className="text-sm font-medium">{stream.streamer}</p>
                    <p className="text-xs text-zinc-400">{stream.game}</p>
                  </div>
                )}
              </a>
            </Link>
          ))}
        </ScrollArea>
      </div>

      <div className="p-4 mt-auto">
        {!collapsed && (
          <>
            <h2 className="text-sm font-semibold mb-4">RECOMMENDED CHANNELS</h2>
            <Button variant="outline" className="w-full">
              <Heart className="mr-2 h-4 w-4" />
              Browse Channels
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
