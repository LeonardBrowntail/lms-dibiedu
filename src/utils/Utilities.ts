export function titleCase(str: string) {
	const words = str.split(" ");
	return words.reduce((text, word) => {
		return (
			text +
			" " +
			word.charAt(0).toUpperCase() +
			word.substring(1).toLowerCase()
		);
	});
}
