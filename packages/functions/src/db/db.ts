import type { WithFieldValue, DocumentData, DocumentReference, Firestore } from 'firebase-admin/firestore';

type Field = WithFieldValue<DocumentData>;

type PathSegment = {
  collection: string;
  doc: string;
}

type CollectionWithData<F extends Field> = {
  segments: PathSegment[];
  data: F;
}

type CollectionWithouData<F extends Field> = Omit<CollectionWithData<F>, 'data'>;

interface CollectionSubCollection<F extends Field> extends Omit<CollectionWithData<F>, 'data'> {
  subcollection: string;
}

export default class DB {
  constructor(private db: Firestore) { }

  private getRef(segments: PathSegment[]) {
    const ref = this.db.collection(segments[0].collection).doc(segments[0].doc);

    return segments.slice(1).reduce<DocumentReference>((ref, segment) => {
      return ref.collection(segment.collection).doc(segment.doc);
    }, ref);
  }

  async update<F extends Field>({ segments, data }: CollectionWithData<Partial<F>>) {
    const ref = this.getRef(segments);

    return ref.update(data);
  }

  public async setItem<F extends Field>({ data, segments }: CollectionWithData<F>) {
    const ref = this.getRef(segments);

    return ref.set(data);
  }

  public async getCollection<F extends Field>({ segments }: CollectionWithouData<F>) {
    const ref = this.getRef(segments);

    const snapshot = await ref.get();

    return snapshot.data() as F;
  }

  public async getSubCollection<F extends Field>({ segments, subcollection }: CollectionSubCollection<F>) {
    const ref = this.getRef(segments);

    const subCollection = ref.collection(subcollection);

    const snapshot = await subCollection.get();

    const data = snapshot.docs.map(doc => doc.data() as F);

    return data;
  }
}