/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'properties-photos.s3.eu-north-1.amazonaws.com',
                port: '',
                pathname: '/uploads/**',
            }
        ]
    }
};

export default nextConfig;
