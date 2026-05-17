import { SITE_CONFIG } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <div className="bg-accent text-white">
      <div className="container-x py-2.5 text-center text-sm font-black uppercase tracking-widest">
        {SITE_CONFIG.announcement}
      </div>
    </div>
  );
}
