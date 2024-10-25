let db: any;

const getFirestoreInstance = async () => {
    if(!db){
        const {getFirestore} = await import ('firebase/firestore')
        const {initializeApp} = await import ('firebase/app')

        const firebaseConfig = {
            apiKey: "AIzaSyCXclD9r0rUmlKLVPdCtYzsj8bq4bjdR7w",
            authDomain: "lab-6-firebase-50b09.firebaseapp.com",
            projectId: "lab-6-firebase-50b09",
            storageBucket: "lab-6-firebase-50b09.appspot.com",
            messagingSenderId: "742744572770",
            appId: "1:742744572770:web:b4220017614c3abe06e23b"
        };

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
    return db;
};

export const addSong = async (song: any) => {
    try {
        const db = await getFirestoreInstance();
        const { collection, addDoc } = await import('firebase/firestore');
		const docRef = await addDoc(collection(db!, 'songs'), song);

		console.log('Document written with ID:', docRef.id);
	} catch (error) {
		console.error(error);
	}
};

export const getSongs = async () => {
    const db = await getFirestoreInstance();
    const { collection, getDocs } = await import('firebase/firestore');
	const querySnapshot = await getDocs(collection(db!, 'songs'));
	const transformed: any[] = [];

	querySnapshot.forEach((doc: any) => {
		const data: any = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

export default {
	addSong,
	getSongs,
};
