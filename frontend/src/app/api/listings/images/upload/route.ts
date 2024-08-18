import { S3Client, PutObjectCommand, PutObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandInput } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

type Image = {
  name: string;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.formData();
    const image = body.get("image") as Image;

    if (!image) {
      return new Response("No image found", { status: 400 });
    }

    const buffer = await image.arrayBuffer();
    const params: PutObjectCommandInput = {
      Bucket: 'properties-photos',
      Key: `uploads/${Date.now()}_${image.name}`,
      Body: Buffer.from(buffer),
      ContentType: image.type,
    };

    try {
      await s3.send(new PutObjectCommand(params));
      const newImageUrl = `https://properties-photos.s3.eu-north-1.amazonaws.com/${params.Key}`;

      return new Response(JSON.stringify({ url: newImageUrl }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return new Response("Failed to upload image", { status: 500 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}


export async function DELETE(req: NextRequest): Promise<Response> {
  const body = await req.json();
  const { urls } = body;

  if (!urls || !Array.isArray(urls)) {
    return new Response("Invalid request", { status: 400 });
  }

  for (const url of urls) {
    const key = url.split("properties-photos.s3.eu-north-1.amazonaws.com/")[1];
    const params: DeleteObjectCommandInput = {
      Bucket: 'properties-photos',
      Key: key,
    };

    try {
      await s3.send(new DeleteObjectCommand(params));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }

  return new Response(null, { status: 204 });
}

