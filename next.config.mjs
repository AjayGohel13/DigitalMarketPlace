/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "digital-market-place-three.vercel.app/",
			},
		],
	},
};

export default nextConfig;
