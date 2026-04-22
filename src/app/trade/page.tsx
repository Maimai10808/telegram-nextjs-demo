import { TelegramStatusBanner } from "@/features/telegram/components/telegram-status-banner";
import { TradePanel } from "@/features/trade/components/trade-panel";
import { OrderHistory } from "@/features/trade/components/order-history";

export default function TradePage() {
  return (
    <div className="space-y-4">
      <TelegramStatusBanner />
      <TradePanel />
      <OrderHistory />
    </div>
  );
}
