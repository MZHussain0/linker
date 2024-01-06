"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
  image: string | "";
}

const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
  image,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full space-y-4 flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="dqq8yovk">
        <div className="p-2 border-4 border-dashed border-theme-400/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-32 w-32">
            <Image
              fill
              alt="upload"
              src={value || image}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
