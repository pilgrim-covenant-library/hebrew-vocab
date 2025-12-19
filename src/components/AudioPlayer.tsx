'use client';

import { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  initializeSpeech,
  speakHebrew,
  stopSpeech,
  isSpeechAvailable,
} from '@/lib/audio';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  hebrew: string;
  size?: 'sm' | 'md' | 'lg';
  showPronunciation?: boolean;
  autoPlay?: boolean;
  className?: string;
}

export function AudioPlayer({
  hebrew,
  size = 'md',
  showPronunciation = false,
  autoPlay = false,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSpeechAvailable()) {
      initializeSpeech().then(setIsAvailable);
    }
  }, []);

  useEffect(() => {
    if (autoPlay && isAvailable && hebrew) {
      playAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, isAvailable]);

  const playAudio = useCallback(async () => {
    if (isPlaying || !isAvailable) return;

    setIsPlaying(true);
    setError(null);

    try {
      await speakHebrew(hebrew);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play audio');
    } finally {
      setIsPlaying(false);
    }
  }, [hebrew, isPlaying, isAvailable]);

  const stopAudio = useCallback(() => {
    stopSpeech();
    setIsPlaying(false);
  }, []);

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  const buttonSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  if (!isAvailable) {
    return null;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(buttonSize, 'rounded-full')}
        onClick={isPlaying ? stopAudio : playAudio}
        disabled={!isAvailable}
        title={isPlaying ? 'Stop' : 'Play pronunciation'}
      >
        {isPlaying ? (
          <Loader2 className={cn(iconSize, 'animate-spin')} />
        ) : (
          <Volume2 className={iconSize} />
        )}
      </Button>

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}

interface AudioButtonProps {
  hebrew: string;
  disabled?: boolean;
  className?: string;
}

export function AudioButton({ hebrew, disabled, className }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (isSpeechAvailable()) {
      initializeSpeech().then(setIsAvailable);
    }
  }, []);

  const handleClick = async () => {
    if (isPlaying || !isAvailable || disabled) return;

    setIsPlaying(true);
    try {
      await speakHebrew(hebrew);
    } finally {
      setIsPlaying(false);
    }
  };

  if (!isAvailable) return null;

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isPlaying}
      className={cn(
        'p-2 rounded-full transition-colors',
        'hover:bg-muted disabled:opacity-50',
        className
      )}
      title="Play pronunciation"
    >
      {isPlaying ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}
