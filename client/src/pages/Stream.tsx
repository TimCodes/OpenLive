import { useParams } from 'wouter';
import { StreamPlayer } from '@/components/stream/StreamPlayer';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { mockStreams } from '@/lib/mock-data';

export function Stream() {
  const { id } = useParams();
  const stream = mockStreams.find(s => s.id === id);

  if (!stream) {
    return <div className="p-4">Stream not found</div>;
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1">
        <StreamPlayer stream={stream} />
      </div>
      <ChatPanel />
    </div>
  );
}
