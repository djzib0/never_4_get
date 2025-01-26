import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 20
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 6
        },
        img: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

const entrySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            min: 6,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {timestamps: true}
)

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Entry = mongoose.models?.Entry || mongoose.model("Entry", entrySchema)