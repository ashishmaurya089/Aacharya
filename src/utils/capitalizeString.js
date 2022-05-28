export function capitalizeString(str) {
	//console.log('str', str);
	if (str.length) {
		const firstLetter = str[0].toUpperCase();
		return firstLetter + str.substring(1, str.length);
	}
}

// export function camelize(str) {
// 	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
// 		if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
// 		return index === 0 ? match.toLowerCase() : match.toUpperCase();
// 	});
// }

export function camalize(str) {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
