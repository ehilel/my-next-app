import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PUBLIC_DB_CONNECTION: "mongodb+srv://efrat10770:NjTHcueeXqvv4ufa@cluster0.jfuxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  }
};

export default nextConfig;
