export const updateEmptyAddresses = async () => {
    const nftCollectionRef = collection(db, "nft_collections"); // Replace with your collection name
    const q = query(nftCollectionRef, where("collection_address", "==", "Your Hardcoded Address"));

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(nftCollectionRef, docSnapshot.id);
        await updateDoc(docRef, {
          collection_address: "0xeD8263C7E0df64bc1E9D69C5A72734DfB85Ba32c",
        });
        console.log(`Updated address for document ${docSnapshot.id}`);
      });
    } catch (error) {
      console.error("Error updating addresses:", error);
    }
  };