import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { connectMongoDB } from "../../lib/mongodb";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth/next";
import Portfolio from "@/models/portfolio";




const f = createUploadthing();

const auth = async (req: Request) => {
    const session = await getServerSession(authOptions);
    return session?.user.id;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    portfolioUploader: f({
        image: {
            maxFileSize: "512MB", // 512MB max file size
            maxFileCount: 15, // 1 file max

        }

    })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            if (!user) throw new UploadThingError("Unauthorized");
            return {
                userId: user
            };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);

            try {

                return metadata;
            } catch (error) {
                console.error("Error saving portfolio entry:", {
                    userId: metadata.userId,
                    fileUrl: file.url,
                    error: error,
                });
                throw new UploadThingError("Error saving portfolio entry");
            }

        }
        )



} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;