import {S3Client, PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

type Image = {
    name: string;
    type: string;
    arrayBuffer: () => Promise<ArrayBuffer>;
}

const s3 = new S3Client({ 
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
   });
  

export async function POST(req: NextRequest): Promise<Response> {
    const body = await req.formData();
    const images: Image | null = body.get("image") as Image | null;
    console.log("Uploading image to S3", images);
    if(!images) {
        return new Response("No image found", { status: 400 });
    }
    const buffer = images ? await images.arrayBuffer() : null;
    const params: PutObjectCommandInput = {
       Bucket: 'properties-photos',
       Key: `uploads/${Date.now()}_${images.name}`,
       Body: buffer ? Buffer.from(buffer) : undefined,
       ContentType: images.type,
    }
    try {
      const response = await s3.send(new PutObjectCommand(params));
      const url = `https://properties-photos.s3.eu-north-1.amazonaws.com/${params.Key}`;
      console.log("Uploaded image to S3", url);
      return new Response(JSON.stringify({ url }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
      return new Response("Error uploading image", { status: 500 });
    }
}

