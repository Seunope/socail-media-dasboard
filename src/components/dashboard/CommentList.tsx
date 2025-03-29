import { CommentCard } from "./CommentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/shared/Loading/Skeleton";
import { analyzeSentiment } from "@/lib/sentiment";

// Mock data - in a real app this would come from an API
const mockComments = [
  {
    id: "1",
    username: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Love this product! Works perfectly for my needs.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    likes: 24,
    platform: "facebook",
    sentimentScore: 3,
  },
  {
    id: "2",
    username: "Sam Wilson",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "The quality is not what I expected for the price.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 5,
    platform: "instagram",
    sentimentScore: -2,
  },
  {
    id: "3",
    username: "Taylor Smith",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Customer service was very helpful when I had issues.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 12,
    platform: "twitter",
    sentimentScore: 2,
  },
];

export default function CommentList() {
  return (
    <div className="space-y-4">
      {mockComments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
}

CommentList.Skeleton = function CommentListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[120px] w-full" />
      ))}
    </div>
  );
};
