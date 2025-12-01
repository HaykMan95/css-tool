import { useEffect, useRef } from "react";

export function GoogleAd({ adSlot }: { adSlot: string }) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current) {
      setTimeout(() => {
        try {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
        } catch (e) {
          console.error("Adsense error:", e);
        }
      }, 100);
    }
  }, []);

  return (
    // <ins
    //   ref={adRef}
    //   className="adsbygoogle"
    //   style={{ display: "block", width: "100%", minHeight: 250 }}
    //   data-ad-client="ca-pub-1298459461393296"
    //   data-ad-slot={adSlot}
    //   data-ad-format="auto"
    //   data-full-width-responsive="true"
    // ></ins>

    <ins 
        ref={adRef}
        className="adsbygoogle"
     style={{ display: "inline-block", width: 223, height: 600 }}
     data-ad-client="ca-pub-1298459461393296"
     data-ad-slot={adSlot}>
        
     </ins>
  );
}
