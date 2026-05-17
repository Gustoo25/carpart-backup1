import { SITE_CONFIG } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <div className="bg-accent text-white">
      <div className="container-x py-2 text-center text-xs font-medium uppercase tracking-widest">
        {SITE_CONFIG.announcement}
      </div>
    </div>
  );
}
