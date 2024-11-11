"use client";
import {
  CommentCount,
  CommentEmbed,
  DiscussionEmbed,
  Recommendations,
} from "disqus-react";

import { useRouter, usePathname } from "next/navigation";

const Disqus = ({ className }: { className?: string }) => {
  const pathName = usePathname();
  const router = useRouter();

  const url = window ? window.origin + pathName : "";

  // https://disqus.com/by/subhammaityxam/comments/
  return (
    <div className={className} key={url}>
      <DiscussionEmbed
        shortname="https-purplesale-ui-vercel-app"
        config={
          {
            url,
            identifier: url,
            title: "PurpleSale",
            language: "en_US",
            sso: {
              name: "SampleNews",
              button: "http://example.com/images/samplenews.gif",
              icon: "http://example.com/favicon.png",
              url: "http://example.com/login/",
              logout: "http://example.com/logout/",
              profile_url: "http://example.com/profileUrlTemplate/{username}",
            },
          } as any
        }
      />
    </div>
  );
};

export default Disqus;
