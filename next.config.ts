import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ระบุตำแหน่งของไฟล์รูปที่อิงจาก supabase 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bvumrcykwytgsmgylbun.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
