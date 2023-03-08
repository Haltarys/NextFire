import { auth, storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import Loader from '../Loader/Loader';

export default function ImageUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = Array.from(files)[0];
    const extension = file.type.split('/')[1];
    const fileRef = ref(
      storage,
      `uploads/${auth.currentUser?.uid}/${Date.now()}.${extension}`,
    );

    setIsUploading(true);
    const uploadTask = uploadBytes(fileRef, file);

    setDownloadURL(
      await uploadTask.then((snapshot) => getDownloadURL(snapshot.ref)),
    );
    setIsUploading(false);
  };

  return (
    <div className="box">
      <Loader show={isUploading} />
      {isUploading && <h3>{progress}%</h3>}

      {!isUploading && (
        <>
          <label className="btn">
            📷 Upload image
            <input
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={uploadFile}
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}
