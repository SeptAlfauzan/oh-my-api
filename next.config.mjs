import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()]
        }
        // Enable WebAssembly
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
        };

        // Optionally, if you're using Wasm in Web Workers
        config.output = {
            ...config.output,
            webassemblyModuleFilename: 'static/wasm/[modulehash].wasm'
        };

        return config;
    },
};

export default nextConfig;
