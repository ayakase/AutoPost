export const getOnePost = async () => {
    const baseTag: string | undefined = Bun.env.MAIN_TAG;
    const ratingFilter = "rating:s";
    if (!baseTag) {
      console.error("MAIN_TAG is undefined");
      return null;
    }
    const combinedTags = `${baseTag} ${ratingFilter}`;
    const url = `https://danbooru.donmai.us/posts/random.json?tags=${encodeURIComponent(combinedTags)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      const post = await response.json();
      return post;
    } catch (error: any) {
      console.error("Failed to fetch post:", error.message);
      return null;
    }
  };
  