import { ReactElement } from "react";
import { IconType } from "react-icons";

export type EntryType = {
    _id: string;
    title: string;
    userId: string;
    isFavourite: boolean;
    isActive: boolean;
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
    _id: string,
    isDarkModeOn: boolean;
    __v?: number
}

export type EntryCommentType = {
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserMenuPositionType = {
    icon: IconType | ReactElement,
    title: string,
    path?: string,
    func?: () => void;
  }