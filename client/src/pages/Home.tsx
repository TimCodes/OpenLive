import { StreamGrid } from '@/components/stream/StreamGrid';
import { mockStreams } from '@/lib/mock-data';

export function Home() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-bold p-4">Live channels we think you'll like</h1>
        <StreamGrid streams={mockStreams} />
      </div>
    </div>
  );
}
