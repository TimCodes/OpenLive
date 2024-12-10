import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Stream } from '@/lib/mock-data';

interface StreamPlayerProps {
  stream: Stream;
}

export function StreamPlayer({ stream }: StreamPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src: stream.thumbnailUrl,
        type: 'video/mp4'
      }]
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [stream]);

  return (
    <div className="w-full bg-black">
      <div data-vjs-player>
        <video
          ref={videoRef as any}
          className="video-js vjs-big-play-centered"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{stream.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <img
            src={stream.avatarUrl}
            alt={stream.streamer}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">{stream.streamer}</p>
            <p className="text-sm text-zinc-400">{stream.game}</p>
            <p className="text-sm text-zinc-400">
              {stream.viewers.toLocaleString()} viewers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
