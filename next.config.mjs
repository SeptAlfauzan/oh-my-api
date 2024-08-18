/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
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
