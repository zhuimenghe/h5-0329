export interface CustomData {
	key?: string;
	name?: string;
	value?: string;
	order?: number;
	show?: boolean;
}

export interface RentalFile {
	name?: string;
	type?: string;
	uploadType?: string;
	uploadTypeName?: number;
	fileDesc?: string;
	businessId?: string;
	url?: string;
	bucket?: string;
	filePath?: string;
	fileServerUrl?: string;
	createByName?: string;
	sharePermission?: string;
}

export interface Machine {
	id?: number;
	machineName?: string;
	machineType?: string;
	maxPlatHeight?: string;
	maxHorizontalExt?: string;
	ratedLoad?: string;
	machineWeight?: string;
	machineDesc?: string;
	customData?: CustomData[];
	machineImg?: RentalFile[];
	machineManual?: RentalFile[];

	totalWorktime?: string;
	machineStatus?: string;
	batteryPower?: string;
	lockLevel?: string;

	showMsg?: string;
}
