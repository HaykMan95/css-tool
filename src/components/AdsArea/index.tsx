import { GoogleAd } from "../GoogleAds";

export function AdsArea({ slotId }: { slotId: string }) {
  return (
    <aside className="w-80 min-h-screen bg-gray-100 border-l border-gray-200 p-4">
      <div className="sticky top-4">
        <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Advertisement</p>
          <GoogleAd adSlot={slotId} />
        </div>
      </div>
    </aside>
  );
}
