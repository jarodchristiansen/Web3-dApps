export default async function addFavoriteUtil(favoriteData) {
  console.log("favoriteData in addFavoriteUtil", favoriteData);
  const response = await fetch("/api/user/add-favorite", {
    method: "PATCH",
    body: JSON.stringify({ data: favoriteData }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
}
