import { ReactElement } from "react";
import { IconType } from "react-icons";

export type EntryType = {
    _id: string;
    title: string;
    userId: string;
    isFavorite: boolean;
    isActive: boolean;
    positions: EntryPositionType[];
    comments: EntryCommentType[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type EntryPositionType = {
    _id: string;
    title: string;
    isFinished: boolean;
    note: string;
}

export type UserSettingsType = {
    _id: string,
    isDarkModeOn: boolean;
    __v?: number
}

export type EntryCommentType = {
    _id: string;
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