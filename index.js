var reactTemplates = require('react-templates/src/reactTemplates');
var url = require('url');
var queryString = require('querystring');

var parseOptions = function (query) {
	try {
		// try to parse ?{"a":"b","c":["d"]}
		return JSON.parse(query.substr(1));
	} catch (e) {
		// fallback to parsing ?a=b&c=d
		return queryString.parse(url.parse(query).query);
	}
};

module.exports = function(source) {
	var options = parseOptions(this.query);
	this.cacheable && this.cacheable();
	return reactTemplates.convertTemplateToReact(source, options);
};
