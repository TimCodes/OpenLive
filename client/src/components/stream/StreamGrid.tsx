import { Link } from 'wouter';
import { Stream } from '@/lib/mock-data';

interface StreamGridProps {
  streams: Stream[];
}

export function StreamGrid({ streams }: StreamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {streams.map((stream) => (
        <Link key={stream.id} href={`/stream/${stream.id}`}>
          <a className="group">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={stream.thumbnailUrl}
                alt={stream.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute bottom-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                {stream.viewers.toLocaleString()} viewers
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <img
                src={stream.avatarUrl}
                alt={stream.streamer}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                <p className="text-sm text-zinc-400">{stream.streamer}</p>
                <p className="text-sm text-zinc-400">{stream.game}</p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
