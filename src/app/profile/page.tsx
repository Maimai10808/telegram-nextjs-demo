import { TelegramStatusBanner } from "@/features/telegram/components/telegram-status-banner";
import { ProfileOverview } from "@/features/profile/components/profile-overview";

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <TelegramStatusBanner />
      <ProfileOverview />
    </div>
  );
}
