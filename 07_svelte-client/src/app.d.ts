// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}


// declare class LedData {
// 	id: number;
// 	value: boolean;
// 	info: string;
// }


declare class McuLedData {
	id: number;
	value: boolean;
	info?: string;
}

declare class McuPswData {
	id: number;
	value: boolean;
	state: string;
	info?: string;
}

declare class McuAdcData {
	id: number;
	value: number;
	delta: number;
	direction: number;
	info?: string;
}

declare class McuData {
	led: McuLedData[];
	psw: McuPswData[];
	adc: McuAdcData[];
}