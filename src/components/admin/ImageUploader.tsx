import { auth, storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../Loader';

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
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        toast.error(`Error uploading file : ${error.name}: ${error.message}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
        });
      },
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
