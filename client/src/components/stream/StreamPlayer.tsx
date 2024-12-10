import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './VideoPlayer.css';
import { Stream } from '@/lib/mock-data';

interface StreamPlayerProps {
  stream: Stream;
}

export function StreamPlayer({ stream }: StreamPlayerProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoElementRef.current) return;

    const videoElement = videoElementRef.current;

    const player = videojs(videoElement, {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      preload: 'auto',
      html5: {
        vhs: {
          overrideNative: true
        }
      },
      sources: [{
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4'
      }],
      poster: stream.thumbnailUrl
    });

    playerRef.current = player;

    player.ready(() => {
      console.log('Player is ready');
      setIsLoading(false);
    });

    player.on('error', () => {
      setError('Failed to load video stream');
      setIsLoading(false);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [stream.id]);

  return (
    <div className="w-full bg-black">
      <div className="relative">
        <div data-vjs-player>
          <video
            ref={videoElementRef}
            className="video-js vjs-big-play-centered vjs-theme-twitch"
          />
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white">Loading stream...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-red-500">{error}</div>
          </div>
        )}
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
