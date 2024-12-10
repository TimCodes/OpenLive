import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './VideoPlayer.css';
import { Stream } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

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
      <div className="aspect-video relative bg-black">
        <div data-vjs-player className="absolute inset-0 z-[1]">
          <video
            ref={videoElementRef}
            className="video-js vjs-big-play-centered"
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[2]">
            <div className="text-white">Loading stream...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[2]">
            <div className="text-red-500">{error}</div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div>
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
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Follow
            </Button>
            <Button variant="default" size="sm">
              <Heart className="w-4 h-4 mr-2" fill="currentColor" />
              Subscribe
            </Button>
          </div>
        </div>
        <div className="bg-zinc-800/50 p-4 rounded-lg">
          <p className="text-sm text-zinc-300">
            Stream started {new Date().toLocaleTimeString()}
          </p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-xs text-zinc-400">Category</p>
              <p className="text-sm">{stream.game}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Tags</p>
              <div className="flex gap-1 mt-1">
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded">English</span>
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded">Gaming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
