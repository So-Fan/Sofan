export const deleteDocuments = async () => {
    const feedLaunchpadRef = collection(db, "feed_launchpad");
    const snapshot = await getDocs(feedLaunchpadRef);

    let count = 0;
    for (const docSnap of snapshot.docs) {
      if (count >= 500) break;

      await deleteDoc(doc(db, "feed_launchpad", docSnap.id));
      count++;
    }

    console.log(`Supprimé ${count} documents.`);
  };