export function createBook(apiItem) {
  return {
    id: apiItem.id,
    author: apiItem.author,
    title: apiItem.title,
    subTitle: apiItem.subTitle,
    imageLink: apiItem.imageLink,
    audioLink: apiItem.audioLink,
    totalRating: apiItem.totalRating,
    averageRating: apiItem.averageRating,
    keyIdeas: apiItem.keyIdeas,
    type: apiItem.type,
    status: apiItem.status,
    subscriptionRequired: apiItem.subscriptionRequired,
    summary: apiItem.summary,
    tags: apiItem.tags,
    bookDescription: apiItem.bookDescription,
    authorDescription: apiItem.authorDescription,
  };
}

export async function fetchSelectedBooks() {
  const response = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch selected books");
  }
  const data = await response.json();
  return data.map((item) => createBook(item));
}

export async function fetchRecommendedBooks() {
  const response = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recommended books");
  }
  const data = await response.json();
  return data.map((item) => createBook(item));
}

export async function fetchSuggestedBooks() {
  const response = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch suggested books");
  }
  const data = await response.json();
  return data.map((item) => createBook(item));
}

export async function fetchBook(id) {
  const response = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }
  const data = await response.json();
  return createBook(data);
}
