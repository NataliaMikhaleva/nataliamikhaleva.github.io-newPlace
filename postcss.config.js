module.exports = {
	plugins: [
		require('autoprefixer')({
			brosers: 'last 10 versions'
		}),
		require('cssnano')({ 
			preset: 'default', 
		})
	]
}