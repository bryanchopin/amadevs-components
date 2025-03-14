import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type ChatMessageProps = {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-start gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar className={cn("h-8 w-8", isUser ? "bg-primary" : "bg-muted")}>
        <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
      </Avatar>

      <div className={cn("rounded-lg p-3 max-w-[80%]", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}

