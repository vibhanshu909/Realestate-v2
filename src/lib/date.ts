export const formatDate = (args: any) => {
	return new Date(args).toLocaleDateString('hi-IN', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};
export function getDate(now = new Date()) {
	now = new Date(now);
	const y = now.getFullYear();
	const m = now.getMonth() + 1;
	const d = now.getDate();
	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
}
export default formatDate;
