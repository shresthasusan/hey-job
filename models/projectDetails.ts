import mongoose from "mongoose";

const ProjectDetailsSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs", required: true },
    contractId: { type: mongoose.Schema.Types.ObjectId, ref: "Contract", required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    project_todo: [
        {
            task: { type: String, required: true },
            deadline: { type: Date, required: true },
            memo: { type: String },
            status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
        },
    ],

    project_files: [
        {
            file_name: { type: String, required: true },
            url: { type: String, required: true },
            uploaded_by: { type: String, enum: ["freelancer", "client"], required: true },
            uploaded_at: { type: Date, default: Date.now }
        }
    ],

    deliveries: [
        {
            file_name: { type: String, required: true },
            url: { type: String, required: true },
            submitted_on: { type: Date, default: Date.now }
        }
    ],

    requirements: { type: String, required: true }, // Editable by client

    meetings: [
        {
            meeting_date: { type: Date, required: true },
            meeting_link: { type: String, required: true }, // Zoom, Google Meet, or custom URL
            scheduled_by: { type: String, enum: ["freelancer", "client"], required: true },
            notes: { type: String }
        }
    ],

    status: {
        type: String,
        enum: ["ongoing", "completed", "revisions", "canceled"],
        default: "Ongoing"
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model("ProjectDetails", ProjectDetailsSchema);
