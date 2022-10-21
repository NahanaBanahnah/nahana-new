const path = require('path')

const nextConfig = {
	//whatever config you have
	//...
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
}

module.exports = nextConfig
