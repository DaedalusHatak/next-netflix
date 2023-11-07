export default async function getUser(page: string, cookie: string) {
  let user;
  try {
    const res = await fetch(`${page}/api/getCookie`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(cookie),
    });
    const json = await res.json();
    user = await json.validToken;
    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
}
