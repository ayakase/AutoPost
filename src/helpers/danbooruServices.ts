import axios from "axios";
export const getRandomPost = async () => {
    const baseTag: string | undefined = Bun.env.MAIN_TAG;
    const ratingFilter = "rating:s";
    if (!baseTag) {
        console.error("MAIN_TAG is undefined");
        return null;
    }
    const combinedTags = `${baseTag}`;
    // ${ratingFilter}
    const url = `https://danbooru.donmai.us/posts/random.json?tags=${encodeURIComponent(combinedTags)}`;
    try {
        const response = await axios.get(url);
        const post = response.data;
        return post;
    } catch (error: any) {
        console.error("Failed to fetch post:", error.message);
        return null;
    }
};
export const getPostByCharacterTag = async (tag: string) => {
    const ratingFilter = "rating:s";
    const combinedTags = `${tag}`;
    // ${ratingFilter}
    const url = `https://danbooru.donmai.us/posts/random.json?tags=${encodeURIComponent(combinedTags)}`;
    try {
        const response = await axios.get(url);
        const post = response.data;
        return post;
    } catch (error: any) {
        console.error("Failed to fetch post:", error.message);
        return null;
    }
};