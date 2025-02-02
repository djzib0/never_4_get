export type EntryType = {
    _id: string;
    title: string;
    userId: string;
    isFavourite: boolean;
    positions: EntryPositionType[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type EntryPositionType = {
    _id: string;
    title: string;
    isFinished: boolean;
}

export type UserSettingsType = {
    _id: string;
    isDarkModeOn: boolean;
}