import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Configs/firebase";

export async function ImageUrlToFile(url, fileName) {
    const response = await fetch([url]);
    const blob = await response.blob();
    return new File([blob], fileName);
}


export const updateAvatarPath = async (uid, path) => {
    try {
      const q = query(collection(db, "users"), where("id", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          const updatedData = { profile_avatar: path };

          updateDoc(userRef, updatedData)
            .then(() => {
              console.log("Avatar path updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating Avatar path:", error);
            });
        });
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};
  
export const updateBannerPath = async (uid, path) => {
    try {
      const q = query(collection(db, "users"), where("id", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          const updatedData = { profile_banner: path };

          updateDoc(userRef, updatedData)
            .then(() => {
              console.log("Banner path updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating banner path:", error);
            });
        });
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
};
  
