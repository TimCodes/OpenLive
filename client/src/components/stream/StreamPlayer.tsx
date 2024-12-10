import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Stream } from '@/lib/mock-data';

interface StreamPlayerProps {
  stream: Stream;
}

export function StreamPlayer({ stream }: StreamPlayerProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoElementRef.current) return;

    const videoElement = videoElementRef.current;

    playerRef.current = videojs(videoElement, {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        // Use a reliable video source for demonstration
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }],
      poster: stream.thumbnailUrl
    }, () => {
      console.log('Player is ready');
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [stream.id]); // Only reinitialize if stream ID changes

  return (
    <div className="w-full bg-black">
      <div data-vjs-player>
        <video
          ref={videoElementRef}
          className="video-js vjs-big-play-centered vjs-theme-twitch"
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
