"use client";

import { Lock, VideoOff } from "lucide-react";
import { BigPlayButton, Player } from "video-react";

interface VideoPlayerProps {
    courseId: number;
    title: string;
    chapterId: number;
    nextChapterId?: number;
    isLocked: boolean;
    videoUrl?: string;
};

const VideoPlayer = ({
    courseId,
    chapterId,
    title,
    nextChapterId,
    videoUrl,
    isLocked
}: VideoPlayerProps) => {

    console.log("LOCKED", isLocked)

    return (
        <div className="relative aspect-video">
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">
                        This chapter is locked
                    </p>
                </div>
            )}

            {!isLocked && videoUrl ? (
                <Player
                    playsInline
                    src={videoUrl}
                    preload="auto"
                    autoPlay
                    fluid
                >
                    <BigPlayButton position="center" />
                </Player>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <VideoOff className="h-8 w-8" />
                    <p className="text-sm">
                        Chapter video is lost somewhere.
                    </p>
                </div>
            )}
        </div>
    )
}

export default VideoPlayer