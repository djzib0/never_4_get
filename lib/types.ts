export type EntryType = {
    _id: string;
    title: string;
    userId: string;
    isFavourite: boolean;
    positions: EntryPositionType[];
    comments: EntryCommentType[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type EntryPositionType = {
    _id: string;
    title: string;
    isActive: boolean;
    note: string;
}

export type UserSettingsType = {
    isDarkModeOn: boolean;
}

export type EntryCommentType = {
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}