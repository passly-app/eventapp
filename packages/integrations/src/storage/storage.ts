import type { FirebaseStorage, UploadTaskSnapshot } from 'firebase/storage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

type OnProgress = (progress: number) => void;
interface Options { file: File; path: string; }

export default class Storage {
  constructor(private storage: FirebaseStorage) { }

  private getProgress(snapshot: UploadTaskSnapshot, onProgress?: OnProgress) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    if (onProgress) { onProgress(progress); };
  }

  public async getFolder() {

  }

  public async getImage(path: string) {
    const storageRef = ref(this.storage, path);

    return getDownloadURL(storageRef);
  }

  public async upload({ file, path }: Options, onProgress?: OnProgress) {
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => this.getProgress(snapshot, onProgress),
        (error) => { reject(error); },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(url => resolve(url))
            .catch(error => reject(error));
        }
      );
    });
  }
}