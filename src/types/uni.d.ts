declare module 'uview-plus' {
	export function install(): void;

	global {
		interface Uni {
			$u: any;
		}
	}
}
