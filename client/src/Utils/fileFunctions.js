export async function ImageUrlToFile(url, fileName) {
    return new File([url], fileName);
}