"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { analyzeSentiment } from "@/lib/sentiment";
import { formatDistanceToNow } from "date-fns";
import { Icons } from "@/components/ui/icons";

interface CommentEvent {
  id: string;
  platform: "facebook" | "instagram" | "twitter";
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  sentiment: {
    score: number;
    comparative: number;
  };
}

export default function RealTimeActivity() {
  const [events, setEvents] = useState<CommentEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("/api/comments/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvents((prev) => [data, ...prev.slice(0, 49)]);
    };

    eventSource.onopen = () => setIsConnected(true);
    eventSource.onerror = () => setIsConnected(false);

    return () => eventSource.close();
  }, []);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "bg-blue-500";
      case "instagram":
        return "bg-pink-500";
      case "twitter":
        return "bg-sky-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Icons.facebook className="h-4 w-4" />;
      case "instagram":
        return <Icons.instagram className="h-4 w-4" />;
      case "twitter":
        return <Icons.twitter className="h-4 w-4" />;
      default:
        return <Icons.messageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-muted-foreground">
          {isConnected ? "Connected to real-time feed" : "Disconnected"}
        </span>
        <Badge variant="outline" className="ml-auto">
          {events.length} events
        </Badge>
      </div>

      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={event.avatar} alt={event.username} />
                    <AvatarFallback>
                      {event.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.username}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          event.sentiment.score > 0
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                            : event.sentiment.score < 0
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                        }`}
                      >
                        {event.sentiment.score > 0
                          ? "Positive"
                          : event.sentiment.score < 0
                          ? "Negative"
                          : "Neutral"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(event.timestamp), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{event.content}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icons.heart className="h-4 w-4" />
                        <span>{event.likes}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getPlatformColor(
                          event.platform
                        )} text-white flex items-center gap-1`}
                      >
                        {getPlatformIcon(event.platform)}
                        {event.platform.charAt(0).toUpperCase() +
                          event.platform.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            Waiting for incoming comments...
          </p>
        </div>
      )}
    </div>
  );
}
