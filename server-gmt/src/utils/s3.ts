import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

console.log(bucketName, region, accessKeyId, secretAccessKey);

export const getSignedUrlForUpload = async (fileName: string, uuid: string) => {
  if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("S3 client not initialized");
  }

  const s3Client = new S3Client({
    region: region || "",
    credentials: {
      accessKeyId: accessKeyId || "",
      secretAccessKey: secretAccessKey || "",
    },
  });
  const s3key = `banners/${uuid}/${fileName}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return { url: signedUrl, s3key };
};

export const getSignedUrlsForUploadPreview = async (
  keys: string[],
  uuid: string
) => {
  if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("S3 client not initialized");
  }

  const s3Client = new S3Client({
    region: region || "",
    credentials: {
      accessKeyId: accessKeyId || "",
      secretAccessKey: secretAccessKey || "",
    },
  });

  const signedUrls = await Promise.all(
    keys.map(async (key) => {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `previews/${uuid}/${key}`,
      });

      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });

      return {
        s3key: `previews/${uuid}/${key}`,
        url: signedUrl,
      };
    })
  );

  return signedUrls;
};

export const getSignedUrlForS3Upload = async (
  key: string,
  contentType: string
) => {
  if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("S3 client not initialized");
  }

  const s3Client = new S3Client({
    region: region || "",
    credentials: {
      accessKeyId: accessKeyId || "",
      secretAccessKey: secretAccessKey || "",
    },
  });
  const s3key = key;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return { url: signedUrl, s3key };
};
