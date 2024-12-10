import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './VideoPlayer.css';
import { Stream } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface StreamPlayerProps {
  stream: Stream;
}

export function StreamPlayer({ stream }: StreamPlayerProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const app = useApp();
  const { toast } = useToast();
  const { isLoggedIn, followedStreams, subscribedStreams, toggleFollow, toggleSubscribe } = app;

  useEffect(() => {
    let player: any;
    
    // Small delay to ensure DOM is ready
    const initializePlayer = setTimeout(() => {
      if (!videoElementRef.current) return;

      const videoElement = videoElementRef.current;

      player = videojs(videoElement, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        preload: 'auto',
        controlBar: {
          children: [
            'playToggle',
            'volumePanel',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'progressControl',
            'liveDisplay',
            'remainingTimeDisplay',
            'customControlSpacer',
            'playbackRateMenuButton',
            'qualitySelector',
            'fullscreenToggle',
          ],
        },
        html5: {
          vhs: {
            overrideNative: true
          }
        },
        sources: [
          {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4',
            label: '1080p',
          },
          {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4',
            label: '720p',
          },
          {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4',
            label: '480p',
          }
        ],
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
    }, 100);

    return () => {
      clearTimeout(initializePlayer);
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
            {stream && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast({
                        title: "Login Required",
                        description: "Please log in to follow channels",
                        variant: "destructive"
                      });
                      return;
                    }
                    toggleFollow(stream.id);
                  }}
                >
                  <Heart
                    className="w-4 h-4 mr-2"
                    fill={followedStreams.has(stream.id) ? "currentColor" : "none"}
                  />
                  {followedStreams.has(stream.id) ? "Following" : "Follow"}
                </Button>
                <Button
                  variant={subscribedStreams.has(stream.id) ? "default" : "secondary"}
                  size="sm"
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast({
                        title: "Login Required",
                        description: "Please log in to subscribe to channels",
                        variant: "destructive"
                      });
                      return;
                    }
                    toggleSubscribe(stream.id);
                  }}
                >
                  <Heart
                    className="w-4 h-4 mr-2"
                    fill={subscribedStreams.has(stream.id) ? "currentColor" : "none"}
                  />
                  {subscribedStreams.has(stream.id) ? "Subscribed" : "Subscribe"}
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="bg-zinc-800/50 p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-300 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              LIVE
              <span className="text-zinc-400">·</span>
              Started {new Date().toLocaleTimeString()}
            </p>
            <p className="text-sm text-zinc-300">
              <span className="text-red-500">{stream.viewers.toLocaleString()}</span> viewers
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-zinc-400 mb-1">Category</p>
              <p className="text-sm font-medium hover:text-purple-400 cursor-pointer">{stream.game}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 mb-1">Language</p>
              <p className="text-sm font-medium">English</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-zinc-400 mb-1">Tags</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-zinc-700/50 px-2 py-1 rounded hover:bg-zinc-700 cursor-pointer transition-colors">English</span>
                <span className="text-xs bg-zinc-700/50 px-2 py-1 rounded hover:bg-zinc-700 cursor-pointer transition-colors">Gaming</span>
                <span className="text-xs bg-zinc-700/50 px-2 py-1 rounded hover:bg-zinc-700 cursor-pointer transition-colors">{stream.game}</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-zinc-300">
            <p className="font-medium mb-1">About {stream.streamer}</p>
            <p className="text-zinc-400">
              Join {stream.streamer} for an exciting gaming session! Follow to never miss a stream.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
