import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { formatDistanceToNow } from "date-fns";
import { getSentimentLabel } from "@/lib/sentiment";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentCardProps {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  platform: "facebook" | "instagram" | "twitter";
  sentimentScore: number;
}

export function CommentCard({
  id,
  username,
  avatar,
  content,
  timestamp,
  likes,
  platform,
  sentimentScore,
}: CommentCardProps) {
  const getPlatformColor = () => {
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

  const getPlatformIcon = () => {
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

  const sentimentLabel = getSentimentLabel(sentimentScore);
  const sentimentClass =
    sentimentScore > 0
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
      : sentimentScore < 0
      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{username}</span>
              <Badge variant="outline" className={`text-xs ${sentimentClass}`}>
                {sentimentLabel}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="mt-1 text-sm">{content}</p>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icons.heart className="h-4 w-4" />
                <span>{likes}</span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${getPlatformColor()} text-white flex items-center gap-1`}
              >
                {getPlatformIcon()}
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
