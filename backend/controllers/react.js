const sendIndexHtml = (req, res) => {
	res.status(200).sendFile(
		'index.html', { root: './backend/static' }
	);
};

module.exports = { sendIndexHtml };
